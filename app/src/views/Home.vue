<script>
import {onMounted, ref} from "vue";
import '@/styles/app.css';
import router from "@/router/routers.js";
import Header from "../components/Header.vue";
import {BarChartOutlined, TeamOutlined, ShopOutlined, CheckOutlined, DownloadOutlined,} from "@ant-design/icons-vue";
import axios from "axios";
import * as echarts from "echarts";

const baseUrl = "http://localhost:3000";


export default {
    name: 'Home',
    components: {Header, BarChartOutlined, TeamOutlined, ShopOutlined, CheckOutlined, DownloadOutlined,},
    setup() {
        // Dados e gráficos
        const totalRestaurants = ref(0);
        const openRestaurants = ref(0);
        const closedRestaurants = ref(0);
        const topCuisines = ref([]);
        const recentRestaurants = ref([]);
        const cuisineChartRef = ref(null);
        const trafficChartRef = ref(null);

        // Filtro
        const filter = ref("");

        const fetchDashboardData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/restaurant`);
                const restaurants = response.data;

                // Total de restaurantes
                totalRestaurants.value = restaurants.length;

                // Restaurantes abertos e fechados
                openRestaurants.value = restaurants.filter((r) => r.isOpen).length;
                closedRestaurants.value = totalRestaurants.value - openRestaurants.value;

                // Top tipos de cozinha
                const cuisineCounts = {};
                restaurants.forEach((r) => {
                    cuisineCounts[r.cuisine] = (cuisineCounts[r.cuisine] || 0) + 1;
                });
                topCuisines.value = Object.entries(cuisineCounts)
                    .map(([name, count]) => ({name, value: count}))
                    .sort((a, b) => b.value - a.value);

                // Restaurantes recentes
                recentRestaurants.value = restaurants.slice(-5).reverse();

                // Inicializa os gráficos
                initializeCuisineChart();
                initializeTrafficChart();
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        const initializeCuisineChart = () => {
            if (!cuisineChartRef.value) return;

            const chart = echarts.init(cuisineChartRef.value);
            chart.setOption({
                tooltip: {
                    trigger: "item",
                },
                series: [
                    {
                        name: "Cuisines",
                        type: "pie",
                        radius: "50%",
                        data: topCuisines.value, // Garante que os dados estão no formato correto
                    },
                ],
            });
        };

        const initializeTrafficChart = () => {
            if (!trafficChartRef.value) return;
            const chart = echarts.init(trafficChartRef.value);
            chart.setOption({
                xAxis: {
                    type: "category",
                    data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                },
                yAxis: {
                    type: "value",
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110],
                        type: "bar",
                        barWidth: "60%",
                        itemStyle: {color: "#1890ff"},
                    },
                ],
            });
        };

        const exportToExcel = () => {
            const data = topCuisines.value.map((cuisine) => ({
                Cuisine: cuisine.name,
                Count: cuisine.length,
            }));
            const csv = [
                Object.keys(data[0]).join(","), // Headers
                ...data.map((row) => Object.values(row).join(",")), // Rows
            ].join("\n");

            const blob = new Blob([csv], {type: "text/csv"});
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "top_cuisines.csv";
            link.click();
        };

        fetchDashboardData();

        onMounted(fetchDashboardData);

        return {
            totalRestaurants,
            openRestaurants,
            closedRestaurants,
            topCuisines,
            recentRestaurants,
            cuisineChartRef,
            trafficChartRef,
            exportToExcel,
        };
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

        <div class="dashboard">
            <!-- Cards de Métricas -->
            <section class="metrics">
                <a-card title="Total Restaurants" bordered>
                    <div class="metric-content">
                        <ShopOutlined style="font-size: 30px; color: #1890ff"/>
                        <p class="metric-value">{{ totalRestaurants }}</p>
                    </div>
                </a-card>
                <a-card title="Open Restaurants" bordered>
                    <div class="metric-content">
                        <CheckOutlined style="font-size: 30px; color: #52c41a"/>
                        <p class="metric-value">{{ openRestaurants }}</p>
                    </div>
                </a-card>
                <a-card title="Closed Restaurants" bordered>
                    <div class="metric-content">
                        <TeamOutlined style="font-size: 30px; color: #ff4d4f"/>
                        <p class="metric-value">{{ closedRestaurants }}</p>
                    </div>
                </a-card>
            </section>

            <!-- Gráficos -->
            <section class="charts">
                <a-card title="Cuisine Distribution" style="flex: 1;">
                    <div ref="cuisineChartRef" style="height: 300px;"/>
                </a-card>
                <a-card title="Traffic Overview" style="flex: 1;">
                    <div ref="trafficChartRef" style="height: 300px;"/>
                </a-card>
            </section>

            <!-- Lista de Restaurantes Recentes -->
            <section class="recent-restaurants">
                <a-card title="Recent Restaurants">
                    <ul>
                        <li v-for="restaurant in recentRestaurants" :key="restaurant.id">
                            {{ restaurant.name }} - {{ restaurant.address }}
                        </li>
                    </ul>
                </a-card>
            </section>

            <!-- Exportação -->
            <section class="export-section">
                <a-button type="primary" @click="exportToExcel">
                    <DownloadOutlined/>
                    Export Top Cuisines
                </a-button>
            </section>
        </div>
    </div>
</template>

<style scoped>
.dashboard {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

/* Métricas */
.metrics {
    display: flex;
    gap: 20px;
}

.metric-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

.metric-value {
    font-size: 24px;
    font-weight: bold;
}

/* Gráficos */
.charts {
    display: flex;
    gap: 20px;
}

.recent-restaurants {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.export-section {
    margin-top: 20px;
    text-align: right;
}
</style>

