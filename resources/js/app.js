import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import {FontAwesomeIcon,
    FontAwesomeLayers,
    FontAwesomeLayersText} from "@/utils/fontawesome";
import { QuillEditor } from '@vueup/vue-quill'
import  { BootstrapVueNext }  from "bootstrap-vue-next";
import VueEasyLightbox from "vue-easy-lightbox";
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import VueNumber from 'vue-number-animation'
import Swal from 'sweetalert2';
window.Swal=Swal;

import '../css/App.css'
  

axios.defaults.baseURL = "/api/";
axios.defaults.headers.common["Authorization"] =
"Bearer " + localStorage.getItem("token");
import { useLoginStore } from "./stores/admin/loginStore.js";
import { useContactStore } from "@/stores/web/contactStore.js";




window.onload= function() {
    if(useLoginStore().accessToken!==null){
    router.push({ name: "Logout" });
    }
setTimeout(function () {
useContactStore().changeModel();

}, 2000);
}


      
 
const app = createApp(App);
app.use(VueAxios, axios);
app.use(BootstrapVueNext);
app.use(VueEasyLightbox);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("font-awesome-layers", FontAwesomeLayers);
app.component("font-awesome-layer-text", FontAwesomeLayersText);
app.use(createPinia());
app.use(router);
app.use(VueNumber);
app.use(setupCalendar, {})
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)
app.component('QuillEditor', QuillEditor);

app.mount("#app");

