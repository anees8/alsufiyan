import {createApp} from 'vue';

import App from './App.vue';
import router from './router'

import BootstrapVue3 from "bootstrap-vue-3";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'


import { library} from "@fortawesome/fontawesome-svg-core";
import { faArrowRight,faHome,faAddressCard,faEnvelope,faEnvelopeOpen,faPhone,faPaperPlane,faLocationDot,faClock,faImage} from "@fortawesome/free-solid-svg-icons";
import {faAddressBook } from "@fortawesome/free-regular-svg-icons";
import { faFacebookF,faWhatsapp} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faArrowRight,faHome,faAddressCard,faEnvelope,faEnvelopeOpen,faPhone,faFacebookF,faWhatsapp,faPaperPlane,faLocationDot,faClock,faImage);

const app=createApp(App);

app.use(router);
app.use(BootstrapVue3);
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount("#app");  

