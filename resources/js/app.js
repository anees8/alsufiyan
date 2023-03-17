import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";

import router from "./router";

import axios from "axios";
import VueAxios from "vue-axios";

// import { VueReCaptcha, useReCaptcha } from 'vue-recaptcha-v3';


import  { BootstrapVueNext }  from "bootstrap-vue-next";
import VueEasyLightbox from "vue-easy-lightbox";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faA, faB, faC, faD, faE, faF, faG, faH, faI, faJ, faK, faL, faM, faN, faO, faP, faQ, faR, faS, faT, faU, faV, faW, faX, faY, faZ,
    faArrowRight,
    faArrowLeft,
    faHome,
    faAddressCard,
    faEnvelope,
    faPhone,
    faPaperPlane,
    faLocationDot,
    faImage,
    faBlog,
    faAt,
    faEyeSlash,
    faChevronLeft,
    faChevronDown,
    faSpinner,
    faHouse,
    faRightFromBracket,
    faGlobe,
    faGauge,
    faVideo,
    faMagnifyingGlass,
    faPen,
    faPlus,
    faClock,
    faEnvelopesBulk,
    faPlaneDeparture,
    faUsers,
    fa0
} from "@fortawesome/free-solid-svg-icons";
import {
    faAddressBook,
    faUser,
    faComment,
    faTrashAlt,
    faEnvelopeOpen
    
} from "@fortawesome/free-regular-svg-icons";

import { faFacebookF, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import {
    FontAwesomeIcon,
    FontAwesomeLayers,
    FontAwesomeLayersText,
} from "@fortawesome/vue-fontawesome";

library.add(
     faA, faB, faC, faD, faE, faF, faG, faH, faI, faJ, faK, faL, faM, faN, faO, faP, faQ, faR, faS, faT, faU, faV, faW, faX, faY, faZ,fa0,
    faArrowRight,
    faUsers,
    faPlaneDeparture,
    faHome,
    faAddressCard,
    faEnvelope,
    faEnvelopeOpen,
    faEnvelopesBulk,
    
    faPhone,
    faFacebookF,
    faWhatsapp,
    faPaperPlane,
    faLocationDot,
    faClock,
    faImage,
    faBlog,
    faArrowLeft,
    faAt,
    faEyeSlash,
    faUser,
    faChevronLeft,
    faChevronDown,
    faSpinner,
    faHouse,
    faRightFromBracket,
    faGlobe,
    faGauge,
    faVideo,
    faMagnifyingGlass,
    faComment,
    faPen,
    faTrashAlt,
    faPlus
);
import VueNumber from 'vue-number-animation'

import Swal from 'sweetalert2';
window.Swal=Swal;
  
axios.defaults.baseURL = "/api/";

axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("token");

   
    
const pinia = createPinia();

const app = createApp(App);
app.use(VueAxios, axios);
app.use(BootstrapVueNext);

app.use(VueEasyLightbox);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("font-awesome-layers", FontAwesomeLayers);
app.component("font-awesome-layer-text", FontAwesomeLayersText);
app.use(pinia);

app.use(router);
app.use(VueNumber);



// app.use(VueReCaptcha, { siteKey: '6LenSowkAAAAADTvKcDRW33ZtVkpr-I2vLVlbP3B' });
app.mount("#app");
