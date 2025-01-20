import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import router from "@/router/routers.js";

const app = createApp(App);

app.use(Antd);
app.use(router);
app.mount('#app');
