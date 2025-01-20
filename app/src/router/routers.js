import {createRouter, createWebHistory} from "vue-router";

import Register from "@/views/Register.vue";
import Home from '@/views/Home.vue';


const routes = [
    { name: 'Register', component: Register, path: '/register' },
    { name: 'Home', component: Home, path: '/' },
];

const router = createRouter({ history: createWebHistory(), routes, });

export default router;