<script>
import { ref } from "vue";
import logo from '@/assets/logo.png';
import router from "@/router/routers.js";
import {EditOutlined, HomeOutlined, LogoutOutlined, PlusOutlined} from "@ant-design/icons-vue";

export default {
  name: 'Header',
  setup() {
        // Definição dos itens do menu
        const items = ref([
            { label: "Home", key: "Home", icon: HomeOutlined },
            { label: "Add Restaurant", key: "AddRestaurant", icon: PlusOutlined },
            { label: "Update Restaurant", key: "UpdateRestaurant", icon: EditOutlined },
            { label: "Logout", key: "Logout", icon: LogoutOutlined },
        ]);

        const current = ref("Home"); // Estado atual do menu

        // Função chamada ao clicar
        const onClick = (e) => {
            console.log('click ', e);
            current.value = e.key; // Atualiza o estado
        };

        return { items, current, onClick, logo};
  },
};
</script>

<template>
    <div class="header-container">
        <!-- Foto no Header -->
        <div class="header-logo">
            <a-image class="header-logo" :src="logo" alt="Logo" :preview="{ visible: false }" width="35px"/>
        </div>

        <a-menu class="header-menu" :selectedKeys="[current]" mode="horizontal" @click="onClick" style="justify-content: flex-start; padding: 0; margin: 0; width: 100%;">
            <!-- Itens do Menu -->
            <a-menu-item v-for="item in items" :key="item.key">
                <component :is="item.icon" />
                {{ item.label }}
            </a-menu-item>
        </a-menu>
    </div>

</template>

<style scoped>
/* Estilos do Header */
.header-container {
    display: flex;
    align-items: center; /* Centraliza itens verticalmente */
    padding: 0 16px; /* Espaçamento interno */
    background-color: #ffffff; /* Fundo branco */
    border-bottom: 1px solid #f0f0f0; /* Linha inferior */
}

/* Estilos para a imagem */
.header-logo {
    margin-top: 5px;
    margin-right: 15px; /* Espaçamento entre a imagem e os itens do menu */
}

/* Estilos para o menu */
.header-menu {
    flex: 1; /* O menu ocupa o restante do espaço */
    display: flex;
    justify-content: flex-start; /* Itens alinhados à esquerda */
}
</style>