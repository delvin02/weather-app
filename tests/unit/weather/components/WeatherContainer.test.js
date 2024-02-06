import WeatherContainer from '@/components/WeatherContainer.vue';
import { createLocalVue, mount } from '@vue/test-utils';
import { assert, describe, vi } from "vitest";
import { expect, test, beforeAll, afterAll } from "vitest";
import { createStore } from 'vuex';
import VueLoaders from 'vue-loaders';
import sinon from 'sinon';
import axios from 'axios';

const mockRouter = {
    push: sinon.spy(),
};

const store = createStore({
    modules: {
        weather: {
            namespaced: true,
            state() {
                return {
                    loading: true,
                    savedCities: [{ "id": 2078025, "name": "Adelaide" }],
                    imageAbbr: "",
                    weatherTemp: 0,
                    error: "",
                    location: "",
                    weatherDescription: "Default Weather Description",
                };
            },
            mutations: {
                UPDATE_LOCATION(state, payload) {
                    state.location = payload;
                },
                UPDATE_WEATHER_DETAILS(state, payload) {
                    // Mock implementation for UPDATE_WEATHER_DETAILS mutation
                    state.weatherDescription = payload.weather_state_name;
                    state.imageAbbr = "https://openweathermap.org/img/wn/" + payload.weather_state_abbr + '@2x.png';
                    state.weatherTemp = payload.the_temp.toFixed();
                },
                LOADING_PENDING(state) {
                    state.loading = true;
                },
                LOADING_COMPLETE(state) {
                    state.loading = false;
                },
                SET_ERROR(state, payload) {
                    state.error = payload;
                },
            },
            actions: {
                fetchWeather(context, id) {
                    context.commit("LOADING_PENDING");
                    axios.get('https://openweather-psi.vercel.app/weather', {
                        params: {
                            id: id
                        }
                    }).then((response) => {
                        const location = response.data.name + ', ' + response.data.sys.country;
                        const weather = response.data.weather[0];
                        const main = response.data.main;

                        const weatherDetails = {
                            weather_state_name: weather.main,
                            weather_state_abbr: weather.icon,
                            the_temp: main.temp
                        };

                        context.commit('UPDATE_LOCATION', location);
                        context.commit('UPDATE_WEATHER_DETAILS', weatherDetails);
                        context.commit('LOADING_COMPLETE');
                    }).catch((error) => {
                        context.commit('SET_ERROR', "Location couldn't be retrieved.");
                        context.commit('LOADING_COMPLETE');
                    });
                },
            },
            getters: {
                location: state => state.location,
                weatherDescription: state => state.weatherDescription,
                imageAbbr: state => state.imageAbbr,
                weatherTemp: state => state.weatherTemp,
                loading: state => state.loading,
                error: state => state.error,
                savedCities: state => state.savedCities,
            },
        },
    },
});




function mountComponent(weatherId) {
    return mount(WeatherContainer, {
        props: { id: weatherId },
        global: {
            plugins: [store, VueLoaders],
            mocks: {
                $router: { push: () => { } }, 
            },
        },
    });
}


describe("WeatherContainer.vue", async () => {    
    it("should display the .vue-loaders element when loading", () => {
        const wrapper = mountComponent(2078025);
        store.commit('weather/LOADING_PENDING');

        expect(wrapper.find('.vue-loaders').exists()).toBe(true);
    });

    // Optional: Additional test when loading is false
    it("should not display the .vue-loaders element when not loading", async () => {
        store.state.weather.loading = false;
        const wrapper = mountComponent(2078025);
        await wrapper.vm.$nextTick(); // Ensure Vue updates the DOM
        expect(wrapper.find('.vue-loaders').exists()).toBe(true);
    });

    it("should call the 'weather/actions.fetchWeather' once when created", async () => {
        // Mock the axios.get method to return a resolved promise
        const fetchWeatherSpy = sinon.spy(WeatherContainer.methods, 'fetchWeather');

        const wrapper = mountComponent(2078025);

        // Wait for the next tick to ensure the component is created
        await wrapper.vm.$nextTick();

        // Expect that the 'fetchWeather' method has been called once
        expect(fetchWeatherSpy.calledOnce).toBe(true);

        // Cleanup the spy
        fetchWeatherSpy.restore();
    });

    it('should call the "fetchWeather" action when "id" has changed', () => {
        const fetchWeatherSpy = sinon.spy(WeatherContainer.methods, 'fetchWeather');
        const wrapper = mountComponent(2078025);

        wrapper.vm.$options.watch.id.call(wrapper.vm);
        expect(fetchWeatherSpy.calledTwice).toBe(true);

        fetchWeatherSpy.restore();
    })

    it('UPDATE_LOCATION', () => {

        store.commit('weather/UPDATE_LOCATION', 'New York');

        expect(store.state.weather.location).toEqual('New York');
    });
});
