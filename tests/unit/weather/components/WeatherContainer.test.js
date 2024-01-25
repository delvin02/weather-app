import WeatherContainer from '@/components/WeatherContainer.vue';
import { mount } from '@vue/test-utils';
import { describe } from "vitest";
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
                    weatherDescription: ""
                };
            },
            getters: {
                location: state => state.location,
                weatherDescription: state => state.weatherDescription,
                imageAbbr: state => state.imageAbbr,
                weatherTemp: state => state.weatherTemp,
                loading: state => state.loading,
                error: state => state.error,
                savedCities: state => state.savedCities
            }
        }
    }
});




function mountComponent(weatherId) {
    return mount(WeatherContainer, {
        props: { id: weatherId },
        global: {
            plugins: [store, VueLoaders],
            mocks: {
                $router: { push: () => { } }, // Mock $router as needed
            },
        },
    });
}

describe("WeatherContainer.vue", async () => {    
    it("should display the .vue-loaders element when loading", () => {
        const wrapper = mountComponent(2078025);
        expect(wrapper.find('.vue-loaders').exists()).toBe(true);
    });

    // Optional: Additional test when loading is false
    it("should not display the .vue-loaders element when not loading", async () => {
        store.state.weather.loading = false;
        const wrapper = mountComponent(2078025);
        await wrapper.vm.$nextTick(); // Ensure Vue updates the DOM
        expect(wrapper.find('.vue-loaders').exists()).toBe(false);
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

});