<script>
import { ref } from "vue";
import logo from '@/assets/logo.png';
import axios from "axios";
import '@/styles/app.css';
import router from "@/router/routers.js";

const baseUrl = 'http://localhost:3000';

export default {
    name: 'Login',
    setup() {
        const form = ref(null);
        const formData = ref({
            username: "",
            password: "",
        });
        const isAccountLoggedIn = ref(null); // conta foi logada com sucesso?

        /**
         *  logged in API
         * @param formData form data
         * @returns {Promise<axios.AxiosResponse<any>>} status code
         **/
        const loggedIn = async (formData) => {
            try {
                const response = await axios.get(baseUrl + `/user?username=${formData.username}&password=${formData.password}`);

                isAccountLoggedIn.value = response.status === 200 && response.data.length === 1;

                if(isAccountLoggedIn.value){ //logar a conta com sucesso
                    localStorage.setItem("username", formData.username) // guarda username
                    await router.push({name: 'Home'});  // vai para o home
                }

            } catch (error) {
                console.error("Error logged in account:", error);
                isAccountLoggedIn.value = false; // Alerta de erro
            }
        };

        const onSubmit = () => {
            console.log("Form submitted with data:", formData.value);
            loggedIn(formData.value); // chama a função para logar a conta
        };

        return { form, formData, onSubmit, isAccountLoggedIn };
    },

    mounted()
    {
        let username = localStorage.getItem('username');

        if(username){ //se lembra-se do user
            router.push({name: 'Home'});  // vai para o home
        }
    },

    data() {
        return {
            logo, // Caminho para a imagem
        };
    },
};
</script>

<template>
    <div class="center-container">
        <div style="margin: auto; ">
            <!-- Exibe alertas de sucesso ou erro -->
            <a-alert message="Logged in account successfully!" type="success" show-icon closable v-if="isAccountLoggedIn" />
            <a-alert message="Account not logged in successfully!" type="error" show-icon closable v-if="!isAccountLoggedIn" />

            <br />

            <div style="text-align: center; margin-bottom: 30px;">
                <a-typography-title>Login</a-typography-title>
                <a-image :src="logo" alt="Logo" :preview="{ visible: false }" width="100px"/>
            </div>

            <a-form :form="form" @finish="onSubmit" layout="vertical" :validate-on="['change', 'blur']">
                <!-- Campo Nome -->
                <a-form-item
                    label="Username"
                    name="username"
                    :rules="[ { required: true, message: 'Please enter username!' } ]"
                >
                    <a-input v-model:value="formData.username" placeholder="Enter your username" />
                </a-form-item>

                <!-- Campo Senha -->
                <a-form-item
                    label="Password"
                    name="password"
                    :rules="[ { required: true, message: 'Please enter password!' } ]"
                >
                    <a-input-password
                        v-model:value="formData.password"
                        placeholder="Enter your password"
                    />
                </a-form-item>

                <!-- Botão Submeter -->
                <a-form-item>
                    <a-button type="primary" v-on:click="onSubmit" html-type="submit" block>Login</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<style scoped>
</style>