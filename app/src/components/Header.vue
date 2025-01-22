<script>
import {ref, watch} from "vue";
import logo from '@/assets/logo.png';
import {HomeOutlined, LogoutOutlined, RestOutlined} from "@ant-design/icons-vue";
import {useRouter, useRoute} from "vue-router";

export default {
    name: 'Header',
    setup() {
        const route = useRoute(); // Acesso à rota atual
        const router = useRouter(); // Navegação entre rotas

        // Definição dos itens do menu
        const menuItems = ref([
            {label: "Home", key: "Home", icon: HomeOutlined},
            {label: "Restaurants", key: "Restaurants", icon: RestOutlined},
        ]);
        const logoutItem = ref({label: "", key: "Logout", icon: LogoutOutlined},);

        const current = ref(route.name); // Estado atual do menu
        const isModalVisible = ref(false); // Controla a visibilidade do modal

        // Atualiza o estado `current` com base na mudança de rota
        watch(
            () => route.name,
            (newRoute) => {
                current.value = newRoute;
            }
        );

        // Função chamada ao clicar
        const onClick = (e) => {
            if (e.key === "Logout") {
                isModalVisible.value = true; // Exibe o modal para confirmação de logout

            } else {
                router.push({name: e.key}); // Navega para a rota correspondente
            }
        };

        // Funções para o modal
        const handleOk = () => {
            console.log("Logout confirmado");
            isModalVisible.value = false;

            //retirar o username do local storage
            localStorage.clear();
            router.push({name: "Login"});
        };

        const handleCancel = () => {
            console.log("Logout cancelado");
            isModalVisible.value = false;
        };

        return {menuItems, logoutItem, current, onClick, logo, isModalVisible, handleOk, handleCancel};
    },
};
</script>

<template>
    <div class="header-container">
        <!-- Foto no Header -->
        <div class="header-logo">
            <a-image class="header-logo" :src="logo" alt="Logo" :preview="{ visible: false }" width="35px"/>
        </div>

        <!-- Menu Principal -->
        <a-menu class="header-menu" :selectedKeys="[current]" mode="horizontal" @click="onClick">
            <a-menu-item v-for="item in menuItems" :key="item.key">
                <component :is="item.icon"/>
                {{ item.label }}
            </a-menu-item>
        </a-menu>

        <!-- Logout -->
        <a-menu class="logout-menu" mode="horizontal" :selectedKeys="[current]" @click="onClick">
            <a-menu-item :key="logoutItem.key">
                <component :is="logoutItem.icon"/>
                {{ logoutItem.label }}
            </a-menu-item>
        </a-menu>

        <!-- Modal de Confirmação -->
        <a-modal
                v-model:visible="isModalVisible"
                title="Confirm Logout"
                @ok="handleOk"
                @cancel="handleCancel"
        >
            <p>Are you sure you want to log out?</p>
        </a-modal>
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