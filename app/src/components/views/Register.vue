<script>
import { ref } from "vue";
import logo from '@/assets/logo.png';

export default {
    setup() {
        const form = ref(null);
        const formData = ref({
            name: "",
            email: "",
            password: "",
        });

        const onSubmit = () => {
            console.log("Form submitted with data:", formData.value);
            alert("Form sent successfully!");
        };

        return { form, formData, onSubmit };
    },

    data() {
        return {
            // Caminho para a imagem
            logo,
        };
    },
};
</script>

<template>
<!--    <a-row gutter="16">-->
        <div style="max-width: 400px; margin: auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <a-typography-title>Register</a-typography-title>
                <a-image :src="logo" alt="Logo" :preview="{ visible: false }" width="100px"/>
            </div>

            <a-form
                :form="form"
                @finish="onSubmit"
                layout="vertical"
                :validate-on="['change', 'blur']"
            >
                <!-- Campo Nome -->
                <a-form-item
                    label="Name"
                    name="name"
                    :rules="[ { required: true, message: 'Please enter name!' } ]"
                >
                    <a-input v-model:value="formData.name" placeholder="Enter your name" />
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
                    <a-button type="primary" html-type="submit" block>
                        Create Account
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
</template>

<style scoped>
/* Adiciona espaçamentos extras entre os elementos */
.p-grid {
    gap: 1rem;
}
</style>