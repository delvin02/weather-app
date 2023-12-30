<template>
    <div>
        <div class="bg-apple-200/80 rounded-lg w-1/4 mx-auto relative">
            <div v-if="loading" class="absolute rounded top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                <vue-loaders-ball-beat color="black"></vue-loaders-ball-beat>
            </div>
            <div v-if="!loading" class="weather container mx-auto">

                <div class="flex justify-between ">

                    <div class="p-5">

                        <h1 class="text-apple-900 text-3xl text-left">{{ weatherTemp + '°C' }}</h1>
                        <p class="subtitle text-apple-900 font-bold text-xl text-left">{{ location }}</p>
                        <p class="font text-lg text-apple-700 text-left">{{ weatherDescription }}</p>
                        <div class="flex gap-2">
                            <button v-if="!isCitySaved" type="button" @click="addWeather" class=" p-1 rounded-lg mt-2 bg-apple-300 w-14 h-14">

                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" class="stroke-2 fill-apple-900 " id="add"><path d="M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z"></path><path fill="none" d="M0 0h48v48H0z"></path></svg>
                                
                            </button>
                            <button v-if="isCitySaved"  type="button" @click="removeSavedCity" class="p-1 rounded-lg mt-2 bg-red-500 w-14 h-14">
                                <svg  class="w-8 h-8 mx-auto text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                                </svg>                        
                            </button>
                        </div>
                    </div>
                    <div class="my-auto">
                    <img  :src="imageAbbr" class=" p-3 object-cover w-36 h-auto aspect-auto" />
                </div>


                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import 'vue-loaders/dist/vue-loaders.css';

export default {
    name: "WeatherContainer",
    props: ['id'],
    computed: {
        ...mapGetters('weather',[
            'location',
            'weatherDescription',
            'imageAbbr',
            'weatherTemp',
            'loading',
            'error',
            'savedCities'
        ]),
        isCitySaved() {
            return  this.savedCities.some(city => city.id == Number(this.id));
        }
    },
    methods: {
        fetchWeather() {
            this.$store.dispatch('weather/fetchWeather', Number(this.id))
        },
        addWeather(){
            this.$store.dispatch('weather/addCity', {'id': this.id, 'name': this.location})
        },
        removeSavedCity() {
            this.$store.dispatch('weather/removeCity', {'id': this.id})
        }
    },
    created() {
        this.fetchWeather();

    },
    watch: {
        error(newValue) {
            if (newValue !== null) { 
                this.$router.push({ path: '/404', query: { error: newValue } });
            }
        },
        id() {
            this.fetchWeather();
        }
    }
}
</script>