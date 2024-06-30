import { createApp } from 'vue'
import App from './App.vue'
import './styles.css'
import router from "@/router";
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

//createApp(App).mount('#app')
createApp(App).use(router).mount('#app')
