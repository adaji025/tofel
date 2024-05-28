import { createApp } from "vue";
import router from '@/router';
import App from "@/App.vue";
import store from '@/store';
import "@/style.css";


/**
 * Loader 
 * 
 * @description : Vue3 Overlay Loader , Spinner
 */
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

/**
 * Add the router instance
 * 
 * @description : N/A
 */
const app = createApp(App);
app.use(store);
app.use(router); 
app.component('Loading', Loading);
app.mount("#app");