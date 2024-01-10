import App from '@/App.vue';
import { mount } from '@vue/test-utils';
import { describe } from "vitest";
import { expect, beforeEach } from "vitest";
import { createStore } from 'vuex';
import router from '@/router'; 

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
    return mount(App, {
        props: { id: weatherId },
        global: {
            plugins: [store, router],
            stubs: ['router-link', 'router-view']
        },
    });
}

describe("App.vue", async () => {
    router.push('/weather/2078025');
    await router.isReady();
    const wrapper = mountComponent(2078025);

    it("should display the current day's date", () => {
        const formattedDate = new Date().toDateString();
        expect(wrapper.html()).contain(formattedDate);
    });
    
    const footerLinks = wrapper.find("app__cities");

    it("contains a router-link to /weather/2078025", () => {
        const routerLinks = wrapper.findAll('router-link-stub');
        const hasTargetLink = routerLinks.some(linkWrapper => {
            const toProp = linkWrapper.attributes('to');
            return toProp === '/weather/2078025';
        });
        expect(hasTargetLink).toBe(true);
    });


    
});