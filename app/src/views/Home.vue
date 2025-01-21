<script>
import {ref} from "vue";
import '@/styles/app.css';
import router from "@/router/routers.js";
import Header from "../components/Header.vue";

export default {
    name: 'Home',
    components: {
        Header
    },
    mounted() {
        if (!localStorage.getItem('username')) { //se nao lembra do user
            router.push({name: 'Login'});  // vai para o Register
        }
    },
    data() {
        let username = localStorage.getItem('username');
        return {username};
    }
}
</script>

<template>
    <div>
        <Header/>

        <br/>

        <div class="center-container" style="background-color: #2c3e50">
            <a-typography-title>Welcome back, {{ username }} !</a-typography-title>
        </div>
    </div>
</template>

<style scoped>

</style>