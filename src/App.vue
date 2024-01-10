
<template>
  <div id="app">


    <div v-if="openSearch" tabindex="-1" aria-hidden="true" class="fixed inset-0 z-50 pb-96 flex items-center justify-center overflow-y-auto overflow-x-hidden h-screen">
      <div class="fixed top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.2)] "
        :class=" openSearch == true ? 'show' : 'hidden'" @click="toggleSearch"

      ></div>
      <div class="relative p-4 w-full max-w-2xl max-h-full">
          <div class="relative rounded-lg shadow bg-apple-100">
              <div class="flex items-center p-4 md:p-5  rounded-b">
                  <AutoComplete  class="w-full pr-3" @change-location="change_location"/>
                  <button type="button" @click="toggleSearch" class="text-gray-400 bg-transparent hover:bg-apple-400    rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  hover:text-white">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>              
              </div>
          </div>
      </div>
    </div>
    <div class="flex flex-col justify-between text-center h-screen bg-apple-100/30" >
      <div>
        <p class="app__date font-bold text-sm text-apple-900 pt-3">By Delvin</p>
        <p class="app__date font-bold text-5xl text-apple-900 py-3">{{ date }}</p>
      </div>
    

      <router-view></router-view>

      <div class="app__cities container flex flex-row items-center  mx-auto">
          <router-link
            v-for="city in savedCities"
            :to="'/weather/' + city.id"
            :key="city.id"
            :class="[ 'p-3', 'm-3', 'grow', 'rounded-lg', 'shadow-lg', 'w-1/3', 'font-medium', 'hover:bg-apple-400', $route.path === '/weather/' + city.id ? '' : 'inactive' ]"
            >
            {{ city.name }} 
          </router-link>
          <div class="p-3 rounded-lg m-3 mx-auto hover:bg-apple-600" :class=" openSearch == true ? 'bg-red-500' : 'bg-apple-400' ">
          <button type="button" @click="toggleSearch" class="flex items-center m-auto">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" class=" stroke-2 w-6 h-auto" :class=" openSearch == true ? 'fill-white stroke-white' : 'fill-apple-900 stroke-apple-900' ">
              <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
              </svg>
          </button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import AutoComplete from './components/AutoComplete.vue';
export default {
  name: 'App',
  components: {
    AutoComplete
  },
  data() {
    return {
      openSearch: false,
    }
  },
  computed: {
    date() {
      return (new Date()).toDateString();
    },
    ...mapGetters('weather', ['loading', 'savedCities']),
  },
  methods: {
    toggleSearch() {
      this.openSearch = !this.openSearch
    },
    change_location(data) {
      this.openSearch = false;
      this.$router.push('/weather/' + data.id);
    },
    addWeather(data) {
      const cityExists = this.cities.find(city => city.id == data.id);
      if (cityExists) {
        return;
      }
      this.cities.push(data);
    },
    removeWeather(data) {
      this.cities = this.cities.filter(city => city.id != data.id);
    },
  }
}
</script>

<style scoped></style>

