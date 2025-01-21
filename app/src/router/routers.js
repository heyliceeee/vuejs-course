import {createRouter, createWebHistory} from "vue-router";

import Register from "@/views/Register.vue";
import Home from '@/views/Home.vue';
import Login from "@/views/Login.vue";
import Restaurants from "@/views/Restaurants.vue";


const routes = [
    { name: 'Register', component: Register, path: '/register' },
    { name: 'Login', component: Login, path: '/login' },
    { name: 'Home', component: Home, path: '/' },
    { name: 'Restaurants', component: Restaurants, path: '/restaurants' },
];

const router = createRouter({ history: createWebHistory(), routes, });

export default router;