<script>
import { ref } from "vue";
import '@/styles/app.css';
import router from "@/router/routers.js";


export default {
    name: 'Home',
    mounted()
    {
        let username = localStorage.getItem('username');

        if(!username){ //se nao lembra do user
            router.push({name: 'Login'});  // vai para o Register
        }
    }
}
</script>

<template>
    <div class="center-container" style="margin-bottom: 30px; margin-right: -50px; background-color: #2c3e50">
      <a-typography-title>`Welcome back, user}!`</a-typography-title>
    </div>
</template>

<style scoped>

</style>