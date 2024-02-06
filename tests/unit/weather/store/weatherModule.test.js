import Vuex from 'vuex';
import weatherModule from '@/store/modules/weather';
import { expect, beforeEach, assert } from "vitest";
import axios from 'axios';
import sinon from 'sinon';

const testAction = (action, payload, state, expectedMutations, done) => {
    let count = 0;
    const commit = (type, payload) => {
        const mutation = expectedMutations[count];
        try {
            expect(mutation.type).toEqual(type);
            if (payload) {
                expect(mutation.payload).toEqual(payload);
            }
        } catch (error) {
            assert.fail(mutation.type, type, error.message);
        }
        console.error(`Mutation type: ${type}`);  // Log the mutation type

        count++;
        if (count >= expectedMutations.length) {
            done();
        }
    };

    action({ commit, state }, payload);
    if (expectedMutations.length === 0) {
        expect(count).toEqual(0)
        done()
    }
};

describe('Weather Module', () => {
    let store;

    beforeEach(() => {
        store = new Vuex.Store({
            modules: {
                weather: weatherModule,
            },
        });
    });

    it('should update location in the state', () => {
        store.commit('weather/UPDATE_LOCATION', 'Test Location');
        expect(store.state.weather.location).toBe('Test Location');
    });

    it('should update weather details in the state', () => {
        const payload = {
            weather_state_name: 'Sunny',
            weather_state_abbr: '01d',
            the_temp: 25,
        };
        store.commit('weather/UPDATE_WEATHER_DETAILS', payload);
        expect(store.state.weather.weatherDescription).toBe('Sunny');
        expect(store.state.weather.imageAbbr).toBe('https://openweathermap.org/img/wn/01d@2x.png');
        expect(store.state.weather.weatherTemp).toBe('25');
    });


});
