<script>
import {ref} from "vue";
import "@/styles/app.css";
import router from "@/router/routers.js";
import Header from "../components/Header.vue";
import axios from "axios";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    CloseOutlined,
    CheckOutlined,
    SaveOutlined,
} from "@ant-design/icons-vue";


const baseUrl = "http://localhost:3000";

export default {
    name: "Restaurants",
    components: {
        Header,
        PlusOutlined,
        EditOutlined,
        DeleteOutlined,
        CheckOutlined,
        CloseOutlined,
        SaveOutlined
    },
    setup() {
        // Definição das colunas
        const columns = ref([
            {
                title: "Name", dataIndex: "name", key: "name",
                slots: {customRender: "name"}, // Slot para edição inline
            },
            {title: "Address", dataIndex: "address", key: "address", slots: {customRender: "address"},},
            {title: "Rating", dataIndex: "rating", key: "rating", slots: {customRender: "rating"},},
            {title: "Cuisine", dataIndex: "cuisine", key: "cuisine", slots: {customRender: "cuisine"},},
            {title: "Price Range", dataIndex: "priceRange", key: "priceRange", slots: {customRender: "priceRange"},},
            {
                title: "Open", dataIndex: "isOpen", key: "isOpen",
                slots: {customRender: "isOpen"}, // Slot personalizado para exibição
            },
            {
                title: "Contact",
                dataIndex: "contactNumber",
                key: "contactNumber",
                slots: {customRender: "contactNumber"},
            },
            {
                title: "Tags", dataIndex: "tags", key: "tags",
                slots: {customRender: "tags"},
            },
            {
                title: "", key: "action",
                slots: {customRender: "action"},
            },
        ]);

        // Dados da tabela
        const data = ref([]);
        const editingId = ref(null); // Armazena o ID da linha em modo de edição
        const deleteId = ref(null); // Armazena o ID do restaurante a ser apagado
        const isModalVisible = ref(false); // Controla a visibilidade do modal

        // Função para definir a cor das tags
        const getTagColor = (tag) => {
            const tagColors = {
                "fine dining": "gold",
                "romantic": "pink",
                "reservation required": "blue",
                "fast food": "red",
                "family friendly": "green",
                "seafood": "cyan",
                "authentic": "geekblue",
                "high quality": "purple",
            };

            return tagColors[tag.toLowerCase()] || "default";
        };

        // mostra os restaurantes
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

        // adiciona uma nova linha no topo da tabela
        const addNewRestaurant = () => {
            const newRestaurant = {
                id: data.value.length + 1 + "", // Gera um novo ID sequencial
                name: "",
                address: "",
                rating: 0.0,
                cuisine: "",
                priceRange: "$",
                isOpen: false,
                contactNumber: "",
                tags: [],
            };

            data.value = [newRestaurant, ...data.value]; // Adiciona o novo restaurante ao topo da lista
            editingId.value = newRestaurant.id; // Coloca a nova linha em modo de edição
        };

        // cria ou edita um restaurante
        const saveRestaurant = async (record) => {
            try {
                const response = await axios.get(`${baseUrl}/restaurant?id=${record.id}`); //obter restaurante

                //se o restaurante atual existe (ou seja, esta a editar um restaurante)
                if (response.status === 200 && response.data.length === 1) {

                    // restaurante existe: faz PUT (edita)
                    const response1 = await axios.put(`${baseUrl}/restaurant/${response.data[0].id}`, {
                        name: record.name,
                        address: record.address,
                        rating: record.rating,
                        cuisine: record.cuisine,
                        priceRange: record.priceRange,
                        isOpen: record.isOpen,
                        contactNumber: record.contactNumber,
                        tags: record.tags,
                    });

                    if (response1.status === 200) { // editou com sucesso
                        console.log("Restaurant updated:", response1.data);
                    } else {
                        console.error("Error updating restaurant");
                    }
                } else {  // se o restaurante atual NAO existe (ou seja, esta a criar um restaurante)
                    // Restaurante nao existe: faz POST (cria)
                    await axios.post(`${baseUrl}/restaurant`, {
                        id: record.id,
                        name: record.name,
                        address: record.address,
                        rating: record.rating,
                        cuisine: record.cuisine,
                        priceRange: record.priceRange,
                        isOpen: record.isOpen,
                        contactNumber: record.contactNumber,
                        tags: record.tags,
                    });
                    console.log("Restaurant created:", record);
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    // Se o restaurante nao existir, faz POST (cria)
                    await axios.post(`${baseUrl}/restaurant`, {
                        name: record.name,
                        address: record.address,
                        rating: record.rating,
                        cuisine: record.cuisine,
                        priceRange: record.priceRange,
                        isOpen: record.isOpen,
                        contactNumber: record.contactNumber,
                        tags: record.tags,
                    });
                    console.log("Restaurant created:", record);
                } else {
                    console.error("Error saving restaurant:", error);
                }
            } finally {
                editingId.value = null; // Sai do modo de edição
                await showRestaurants(); // Atualiza a lista
            }
        };

        // esta a editar
        const startEditing = (record) => {
            editingId.value = record.id; // Define a linha em modo de edição
        };

        // elimina um restaurante
        const deleteRestaurant = async () => {
            if(deleteId.value != null){ //se foi selecionado algum restaurante para eliminar
                try {
                    await axios.delete(`${baseUrl}/restaurant/${deleteId.value}`);

                    data.value = data.value.filter((restaurant) => restaurant.id !== deleteId.value); //refresh data
                    console.log(`Restaurant with ID ${deleteId.value} deleted successfully.`);

                } catch (error) {
                    console.error(`Error deleting restaurant with ID ${deleteId.value}:`, error);
                } finally {
                    isModalVisible.value = false; // Fecha o modal
                    deleteId.value = null;
                }
            }
        };

        // Funções para o modal
        const confirmDelete = (id) => {
            console.log("Delete confirmado");
            deleteId.value = id;
            isModalVisible.value = true;
        };

        const cancelDelete = () => {
            console.log("Delete cancelado");
            deleteId.value = null;
            isModalVisible.value = false;
        };

        return {columns, data, getTagColor, showRestaurants, addNewRestaurant, saveRestaurant, editingId, startEditing, deleteRestaurant, confirmDelete, cancelDelete, isModalVisible};
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
            <a-button type="primary" style="margin-bottom: 15px" @click="addNewRestaurant">
                <PlusOutlined/>
                New Restaurant
            </a-button>

            <a-table :columns="columns" :dataSource="data" bordered rowKey="id">
                <!-- Slot para edição inline no "Name" -->
                <template #name="{ record }">
                    <a-input
                            v-if="editingId === record.id"
                            v-model:value="record.name"
                            placeholder="Enter name"
                    />
                    <span v-else>{{ record.name }}</span>
                </template>

                <!-- Slot para edição inline no "Address" -->
                <template #address="{ record }">
                    <a-input
                            v-if="editingId === record.id"
                            v-model:value="record.address"
                            placeholder="Enter address"
                    />
                    <span v-else>{{ record.address }}</span>
                </template>

                <!-- Slot para "Rating" -->
                <template #rating="{ record }">
                    <a-input-number
                            v-if="editingId === record.id"
                            v-model:value="record.rating"
                            :min="0"
                            :max="5"
                            step="0.1"
                            placeholder="Enter rating"
                    />
                    <span v-else>{{ record.rating }}</span>
                </template>

                <!-- Slot para "Cuisine" -->
                <template #cuisine="{ record }">
                    <a-input
                            v-if="editingId === record.id"
                            v-model:value="record.cuisine"
                            placeholder="Enter cuisine"
                    />
                    <span v-else>{{ record.cuisine }}</span>
                </template>

                <!-- Slot para "Price Range" -->
                <template #priceRange="{ record }">
                    <a-select
                            v-if="editingId === record.id"
                            v-model:value="record.priceRange"
                            placeholder="Select price range"
                    >
                        <a-select-option value="$">$</a-select-option>
                        <a-select-option value="$$">$$</a-select-option>
                        <a-select-option value="$$$">$$$</a-select-option>
                        <a-select-option value="$$$$">$$$$</a-select-option>
                    </a-select>
                    <span v-else>{{ record.priceRange }}</span>
                </template>

                <!-- Slot para "Open" -->
                <template #isOpen="{ record }">
                    <a-switch
                            v-if="editingId === record.id"
                            v-model:checked="record.isOpen"
                    />
                    <span v-else>
                      <CheckOutlined v-if="record.isOpen" style="color: green;"/>
                      <CloseOutlined v-else style="color: red;"/>
                  </span>
                </template>

                <!-- Slot para "Contact" -->
                <template #contactNumber="{ record }">
                    <a-input
                            v-if="editingId === record.id"
                            v-model:value="record.contactNumber"
                            placeholder="Enter contact"
                    />
                    <span v-else>{{ record.contactNumber }}</span>
                </template>

                <!-- Slot para "Tags" -->
                <template #tags="{ record }">
                    <a-select
                            v-if="editingId === record.id"
                            v-model:value="record.tags"
                            mode="tags"
                            placeholder="Enter tags"
                            style="width: 100%"
                    />
                    <div v-else>
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
                        <a v-if="editingId === record.id" @click="saveRestaurant(record)">
                            <SaveOutlined style="color: dodgerblue;"/>
                        </a>
                        <a v-else @click="startEditing(record)">
                            <EditOutlined style="color: black;"/>
                        </a>
                        <a @click="confirmDelete(record.id)">
                            <DeleteOutlined style="color: red;"/>
                        </a>
                    </a-space>
                </template>
            </a-table>
        </div>

        <!-- Modal de Confirmação -->
        <a-modal
            v-model:visible="isModalVisible"
            title="Confirm Deletion"
            ok-type="danger"
            @ok="deleteRestaurant"
            @cancel="cancelDelete"
        >
            <p>Are you sure you want to delete this restaurant?</p>
        </a-modal>
    </div>
</template>

<style scoped>
</style>
