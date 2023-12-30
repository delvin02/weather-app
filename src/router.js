import { createRouter, createWebHistory } from 'vue-router';
import WeatherContainer from "@/components/WeatherContainer.vue";
import NotFoundContainer from "@/components/NotFoundContainer.vue";
import HomeContainer from "@/components/HomeContainer.vue";
import AutoComplete from "@/components/AutoComplete.vue";

const routes = [
    {
        path: '/',
        component: HomeContainer,
        name: 'Home'
    },
    {
        path: '/weather/:id',
        component: WeatherContainer,
        props: true,
        beforeEnter: (to, from, next) => {
            const id = to.params.id;
            // check when to redirect NotFound
            next()
        }
    },
    {
        path: '/autocomplete',
        component: AutoComplete,
        name: "Auto Complete"

    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFoundContainer
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: "active"
});

export default router;