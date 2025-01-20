<script>
import { ref } from "vue";
import logo from '@/assets/logo.png';
import router from "@/router/routers.js";
import {HomeOutlined} from "@ant-design/icons-vue";
import useState from "ant-design-vue/es/_util/hooks/useState.js";

export default {
  name: 'Header',
    setup() {
      const items = [
          { label: "Home", key: "Home", icon: HomeOutlined }
      ];

        const [current, setCurrent] = useState("mail");
        const onClick = (e) => {
            console.log('click ', e);
            setCurrent(e.key);
        };


    }
};
</script>

<template>
    <div class="header-center-container" style="margin-bottom: 30px; margin-right: -50px; background-color: #2c3e50">
        <a-menu onclick="onClick" selected-keys(v-model)="current" mode="horizontal" items="items"/>
    </div>
</template>

<style scoped>
/* Centraliza horizontal e verticalmente */
.header-center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 8vh; /* Ocupa a altura total do ecrã */
}
</style>