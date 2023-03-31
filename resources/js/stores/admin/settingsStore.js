import { defineStore } from "pinia";
import axios from "axios";
import router from "../../router.js";

export const useAdminSettingStore = defineStore("adminsettingStore", {
    state: () => ({
        logo: "/logo/logo.png",
        previewlogo:null,
        slogo: "/logo/slogo2.png",
        previewslogo:null,
        loading: false,
        footer_about:" Hajj and Umrah are Islamic pilgrimages to Mecca, with Hajj being mandatory and Umrah being optional. Service providers offer packages including transportation, accommodation, food, etc.",
        social_icons: [
            {
                icon: "fa-brands fa-facebook-f",
                url: "https://www.facebook.com/ColanInfotechTeam/",
                iconclass: "text-primary",
            },
            {
                icon: "fa-brands fa-whatsapp",
                url: "https://wa.me/9876543210?text=[Hi]",
                iconclass: "text-success",
            },
        ],
        errors:[]
    }),

    actions: {

        onFileChange: function (e) {
           
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
            if(e.target.id=='logo'){
            this.logo=e.target.files[0];
            this.previewlogo= reader.result;
            }else if(e.target.id=='slogo'){
             this.slogo=e.target.files[0];
            this.previewslogo = reader.result;
            }
            };
        },
        async getSettings() {
           
            try {
                let url = "settings";
             
                const response = await axios.get(url);
                  this.logo=response.data.data.logo;
                  this.previewlogo=response.data.data.logo;
                  this.slogo=response.data.data.slogo;
                  this.previewslogo=response.data.data.slogo;
                  this.footer_about=response.data.data.footer_about;


            } catch (error) {
                if (error.response) {
                    if (error.response.status === 403) {
                        router.push({ name: "NotAuthorize" });
                    } else if (error.response.status === 400) {
                        this.errors = error.response.data.errors;
                    }
                }
                this.isBusy = false;
                setTimeout(() => {
                    this.errors = {};
                }, 5000);
            }
           
          


        },
      async  onSettingChange(){
          
            const formData = new FormData();
            let config = {
                header: {
                    "content-type": "multipart/form-data",
                },
            };

            let url = "settings";

                if(this.logo){
                formData.append("logo", this.logo);
                }
                if(this.slogo){
                formData.append("slogo", this.slogo);
                }

                if(this.footer_about){
                formData.append("footer_about", this.footer_about);
                }

         
            try {
                const response = await axios.post(
                    url,
                    formData,
                    config
                );
               
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 403) {
                        router.push({ name: "NotAuthorize" });
                    } else if (error.response.status === 400) {
                        this.errors = error.response.data.errors;
                    }
                    setTimeout(() => {
                        this.errors = {};
                    }, 5000);
                }
                this.loading = false;
            }

        }


    },
});
