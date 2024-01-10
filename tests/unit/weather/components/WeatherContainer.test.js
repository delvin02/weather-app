import WeatherContainer from '@/components/WeatherContainer.vue';
import { mount } from '@vue/test-utils';
import { describe } from "vitest";
import { expect, test, beforeAll, afterAll } from "vitest";
import { createStore } from 'vuex';
import VueLoaders from 'vue-loaders';



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

});