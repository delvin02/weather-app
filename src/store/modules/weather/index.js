import axios from 'axios';

const state = {
    location: "",
    weatherDescription: "",
    imageAbbr: "",
    weatherTemp: 0,
    loading: false,
    error: "",

    // App
    savedCities: [
    ]
}

const mutations = {
    UPDATE_LOCATION(state, payload) {
        state.location = payload;
    },
    UPDATE_WEATHER_DETAILS(state, payload) {
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
    ADD_CITY(state, payload) {
        state.savedCities.push(payload);
    },
    SET_SAVED_CITIES(state, payload) {
        state.savedCities = payload;
    }
};

const actions = {
    fetchWeather(context, id) {

        context.commit("LOADING_PENDING");
        axios.get('https://openweather-psi.vercel.app//weather', {
            params: {
                id: id
            }
        }).then((response) => {
            // Extracting location
            const location = response.data.name + ', ' + response.data.sys.country;

            // Extracting weather details
            const weather = response.data.weather[0];
            const main = response.data.main;

            const weatherDetails = {
                weather_state_name: weather.main,
                weather_state_abbr: weather.icon,
                the_temp: main.temp
            };


            // Committing mutations with extracted data
            context.commit('UPDATE_LOCATION', location);
            context.commit('UPDATE_WEATHER_DETAILS', weatherDetails);
        }).catch((error) => {

                // Optionally, commit a mutation to update the state
                context.commit('SET_ERROR', "Location couldn't be retrieved.");

                // Update loading state
        });
        context.commit('LOADING_COMPLETE');
    },
    addCity(context, data) {
        console.log(data);
        context.commit("LOADING_PENDING");
        const cityExists = context.state.savedCities.some(city => city.id === data.id);
        if (!cityExists) {
            context.commit('ADD_CITY', data);
        }
        context.commit('LOADING_COMPLETE');
    },
    removeCity(context, data) {
        context.commit("LOADING_PENDING");

        // access to its state through context object
        const cities = context.state.savedCities.filter(city => city.id != data.id);
        context.commit('SET_SAVED_CITIES', cities);
        context.commit('LOADING_COMPLETE');

    }
};

const getters = {
    location: state => state.location,
    weatherDescription: state => state.weatherDescription,
    imageAbbr: state => state.imageAbbr,
    weatherTemp: state => state.weatherTemp,
    loading: state => state.loading,
    error: state => state.error,
    savedCities: state => state.savedCities
};

const weatherModule = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

export default weatherModule;