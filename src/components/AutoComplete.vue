<template>
    <div>

        <VueMultiselect
            v-model="selected"
            :options="options"
            @select="updateSelected"
            @search-change="find"
            :close-on-select="true"
            :clear-on-select="false"
            :allow-empty="false"
            :searchable="true"
            placeholder="Search a city"
            label="name"
            track-by="name"
            :custom-label="nameWithCountry" 
            >

        </VueMultiselect>
    </div>
</template>

<script>
import VueMultiselect from 'vue-multiselect';
import cities from "@/data/openweather-city.json";

export default {
    name: "AutoComplete",
    components: { VueMultiselect },
    data() {
        return {
            selected: undefined,
            options: []
        };
    },
    created() {
        this.initResults();
    },
    methods: {
        initResults() {
            this.options = cities.slice(0, 10);
        },
        find(searchQuery) {
            if (!searchQuery) {
                this.options = cities.slice(0, 10);
            } else {
                const query = searchQuery.trim().toLowerCase();
                this.options = cities.filter(item => 
                    item.name.toLowerCase().includes(query) ||
                    item.country.toLowerCase().includes(query)
                ).slice(0, 50);
            }
        },
        updateSelected (item) {
            this.selected = item
            this.$emit('change-location', this.selected);
        },
        nameWithCountry ({ name, country }) {
            return `${name} — [${country}]`
        },
    },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

