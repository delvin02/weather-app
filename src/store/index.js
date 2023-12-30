import { createStore } from 'vuex';
import weatherModule from './modules/weather';

const store = createStore({
    modules: {
        weather: weatherModule,
    },
});

export default store;