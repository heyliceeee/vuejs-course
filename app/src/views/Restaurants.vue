<script>
import {ref} from "vue";
import "@/styles/app.css";
import router from "@/router/routers.js";
import Header from "../components/Header.vue";
import axios from "axios";
import {PlusOutlined, EditOutlined, DeleteOutlined, CloseOutlined, CheckOutlined} from "@ant-design/icons-vue";
import {SearchOutlined} from "@ant-design/icons";


const baseUrl = "http://localhost:3000";

export default {
    name: "Restaurants",
    methods: {SearchOutlined},
    components: {
        Header,
        PlusOutlined,
        EditOutlined,
        DeleteOutlined,
        CheckOutlined,
        CloseOutlined
    },
    setup() {
        // Definição das colunas
        const columns = ref([
            {title: "ID", dataIndex: "id", key: "id"},
            {title: "Name", dataIndex: "name", key: "name"},
            {title: "Address", dataIndex: "address", key: "address"},
            {title: "Rating", dataIndex: "rating", key: "rating"},
            {title: "Cuisine", dataIndex: "cuisine", key: "cuisine"},
            {title: "Price Range", dataIndex: "priceRange", key: "priceRange"},
            {
                title: "Open",
                dataIndex: "isOpen",
                key: "isOpen",
                slots: {customRender: "isOpen"}, // Slot personalizado para exibição
            },
            {title: "Contact", dataIndex: "contactNumber", key: "contactNumber"},
            {
                title: "Tags",
                dataIndex: "tags",
                key: "tags",
                slots: {customRender: "tags"},
            },
            {
                title: "Action",
                key: "action",
                slots: {customRender: "action"},
            },
        ]);

        // Dados da tabela
        const data = ref([]);

        // Função para definir a cor das tags
        const getTagColor = (tag) => {
            const tagColors = {
                "Fine Dining": "gold",
                Romantic: "pink",
                "Reservation Required": "blue",
                "Fast Food": "red",
                "Family Friendly": "green",
                Seafood: "cyan",
                Authentic: "geekblue",
                "High Quality": "purple",
            };

            return tagColors[tag] || "default";
        };

        // Função para buscar os restaurantes
        const showRestaurants = async () => {
            try {
                const response = await axios.get(`${baseUrl}/restaurant`);
                if (response.status === 200) {
                    data.value = response.data; // Armazena os dados na tabela
                } else {
                    console.warn("Unexpected response:", response);
                }
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        };

        return {
            columns,
            data,
            getTagColor,
            showRestaurants,
        };
    },

    mounted() {
        const username = localStorage.getItem("username");

        if (!username) {
            router.push({name: "Login"});
        } else {
            this.showRestaurants(); // Chama a função para carregar os restaurantes
        }
    },
};
</script>

<template>
    <div>
        <Header/>

        <br/>

        <div class="table-container">
            <a-button type="primary" style="margin-bottom: 15px">
                <PlusOutlined/>
                New Restaurant
            </a-button>

            <a-table :columns="columns" :dataSource="data" bordered>
                <!-- Slot para coluna 'Open' -->
                <template #isOpen="{ record }">
                  <span>
                    <CheckOutlined v-if="record.isOpen" style="color: green;"/>
                    <CloseOutlined v-else style="color: red;"/>
                  </span>
                </template>

                <!-- Slot para "Tags" -->
                <template #tags="{ record }">
                    <div>
                        <a-tag
                                v-for="tag in record.tags"
                                :key="tag"
                                :color="getTagColor(tag)"
                        >
                            {{ tag.toUpperCase() }}
                        </a-tag>
                    </div>
                </template>

                <!-- Slot para "Action" -->
                <template #action="{ record }">
                    <a-space size="middle">
                        <a>
                            <EditOutlined style="color: black;"/>
                        </a>
                        <a>
                            <DeleteOutlined style="color: red;"/>
                        </a>
                    </a-space>
                </template>
            </a-table>
        </div>
    </div>
</template>

<style scoped>
</style>
