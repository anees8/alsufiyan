import { defineStore } from "pinia"
import axios from "axios";
import router from "../../router.js";
import { useLoginStore } from "./loginStore.js";
import { useSettingStore } from "../web/settingStore.js";

export const useAdminSettingStore = defineStore("adminsettingStore", {
    state: () => ({
        settings:{
            logo: "/logo/logo.png",
            slogo: "/logo/slogo2.png",
            footer:" Hajj and Umrah are Islamic pilgrimages to Mecca, with Hajj being mandatory and Umrah being optional. Service providers offer packages including transportation, accommodation, food, etc.",
        },
    
        previewlogo:null,
        previewslogo:null,
        previewsposter:null,
        loading: false,
        visible: false,
        currentindex: null,
      
        errors:[],

        message:""
    }),

    actions: {
        show(index) {
            this.currentindex = index;
            this.visible = true;
        },
        handleHide() {
            this.visible = false;
        },

        onFileChange: function (e) {
           
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
            if(e.target.id=='logo'){
            this.settings.logo=e.target.files[0];
            this.previewlogo= reader.result;
            }else if(e.target.id=='slogo'){
             this.settings.slogo=e.target.files[0];
            this.previewslogo = reader.result;
            }else if(e.target.id=='poster'){
                this.settings.poster=e.target.files[0];
                this.previewsposter = reader.result;
            }
            };
        },
        async getSettings() {
            this.loading = true;
           
            try {
                let url = "settings";
             
                const response = await axios.get(url);

                this.settings=response.data.data.settings;
                this.previewlogo= response.data.data.settings.logo;
                this.previewslogo= response.data.data.settings.slogo;
                this.previewsposter= response.data.data.settings.poster;
                this.loading = false;
               

            } catch (error) {
                if (error.response) {
                    if (error.response.status === 403) {
                        router.push({ name: "NotAuthorize" });
                    } else if (error.response.status === 400) {
                            this.errors = error.response.data.errors;
                    }
                }
                this.loading = false;
                setTimeout(() => {
                    this.errors = {};
                }, 5000);
            }
           
          


        },
      async  onSettingChange(){
        this.loading = true;
            const formData = new FormData();
            let config = {
                header: {
                    "content-type": "multipart/form-data",
                },
            };

            let url = "settings";
           
          
            if (this.settings.email) {
                formData.append("email", this.settings.email);
            }
            if (this.settings.CompanyName) {
                formData.append("CompanyName", this.settings.CompanyName);
            }
            if (this.settings.CompanyPhone) {
                formData.append("CompanyPhone", this.settings.CompanyPhone);
            }
            if (this.settings.CompanyAlternatePhone) {
                formData.append("CompanyAlternatePhone", this.settings.CompanyAlternatePhone);
            }
            if (this.settings.CompanyAdress) {
                formData.append("CompanyAdress", this.settings.CompanyAdress);
            }
            if (this.settings.about) {
                formData.append("about", this.settings.about);
            }

            if (this.settings.logo) {
                formData.append("logo", this.settings.logo);
            }
            if (this.settings.slogo) {
                formData.append("slogo", this.settings.slogo);
            }
            if (this.settings.poster) {
                formData.append("poster", this.settings.poster);
            }
            if (this.settings.facebook) {
                formData.append("facebook", this.settings.facebook);
            }
            if (this.settings.youtube) {
                formData.append("youtube", this.settings.youtube);
            }

            if (this.settings.whatsapp) {
                formData.append("whatsapp", this.settings.whatsapp);
            }
            if (this.settings.footer) {
                formData.append("footer", this.settings.footer);
            }
            if (this.settings.copyright) {
                formData.append("copyright", this.settings.copyright);
            }
            if (this.settings.openingTime) {
                formData.append("openingTime", this.settings.openingTime);
            }


            
         
            try {
                formData.append("_method", "put");
                const response = await axios.post(
                    url +'/'+ this.settings.id,
                    formData,
                    config
                );
                useSettingStore().getSettings();
                useLoginStore().refreshUserPermissions();
                this.getSettings();
              
            

                 this.message=response.data.message;
                setTimeout(() => {
                    this.message = "";
                }, 5000);

                setTimeout(() => {
                    this.loading = false;
                }, 2000);
              
               
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 403) {
                        router.push({ name: "NotAuthorize" });
                    } else if (error.response.status === 400) {
                            this.errors = error.response.data.errors;
                    }
                }
                this.loading = false;
                setTimeout(() => {
                    this.errors = {};
                }, 5000);
               
            }

        }


    },
});
