import { defineStore } from "pinia";
import axios from "axios";

export const useSettingStore = defineStore("settingStore", {
    state: () => ({
         settings:[],
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
    }),

    actions: {

        async getSettings() {
            this.loading = true;
           
            try {
                let url = "setting";
             
                const response = await axios.get(url);

                this.settings=response.data.data.settings;
            
                this.loading = false;
               

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


    },
});
