import {defineStore } from 'pinia';
import axios from 'axios';



export const useSettingStore = defineStore('settingStore',{
    state: () => ({
        logo:"/logo/logo.png",
        slogo:"/logo/slogo2.png",
        FooterAbout:" Hajj and Umrah are Islamic pilgrimages to Mecca, with Hajj being mandatory and Umrah being optional. Service providers offer packages including transportation, accommodation, food, etc.",
        social_icons:[{icon:"fa-brands fa-facebook-f",url:"https://www.facebook.com/ColanInfotechTeam/",iconclass:"text-primary"},{icon:"fa-brands fa-whatsapp",url:"https://wa.me/9876543210?text=[Hi]",iconclass:"text-success"}]

    }),


    actions: {


    }
    
})