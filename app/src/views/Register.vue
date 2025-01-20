<script>
import { ref } from "vue";
import logo from '@/assets/logo.png';
import axios from "axios";
import '@/styles/app.css';
import router from "@/router/routers.js";

const baseUrl = 'http://localhost:3000';

export default {
    name: 'Register',
    setup() {
        const form = ref(null);
        const formData = ref({
            username: "",
            email: "",
            password: "",
        });
        const isAccountCreated = ref(null); // conta foi criada com sucesso?

        /**
         *  create account in API
         * @param formData form data
         * @returns {Promise<axios.AxiosResponse<any>>} status code
         **/
        const createAccount = async (formData) => {
            try {
                const response = await axios.post(baseUrl + "/user", {
                    id: 4,
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                });

                isAccountCreated.value = response.status === 201;

                if(isAccountCreated.value){
                    // vai para o home
                    await router.push({name: 'Home'});
                }

            } catch (error) {
                console.error("Error creating account:", error);
                isAccountCreated.value = false; // Alerta de erro
            }
        };

        const onSubmit = () => {
            console.log("Form submitted with data:", formData.value);
            createAccount(formData.value); // chama a função para criar a conta
        };

        return { form, formData, onSubmit, isAccountCreated };
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
            <a-alert message="Create Account successfully!" type="success" show-icon closable v-if="isAccountCreated" />
            <a-alert message="Account not created successfully!" type="error" show-icon closable v-if="!isAccountCreated" />

            <br />

            <div style="text-align: center; margin-bottom: 30px;">
                <a-typography-title>Register</a-typography-title>
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

                <!-- Campo E-mail -->
                <a-form-item
                    label="E-mail"
                    name="email"
                    :rules="[
          { required: true, message: 'Please enter your email!' },
          { type: 'email', message: 'Please enter a valid email!' }
        ]"
                >
                    <a-input
                        v-model:value="formData.email"
                        placeholder="Digite seu e-mail"
                    />
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
                    <a-button type="primary" v-on:click="onSubmit" html-type="submit" block>Create Account</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<style scoped>
</style>