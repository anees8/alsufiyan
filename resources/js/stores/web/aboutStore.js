import { defineStore } from "pinia";
import axios from "axios";

export const useAboutStore = defineStore("aboutStore", {

    state: () => ({
        branches:[],

    }),
    actions: {
        async getBraches() {
            this.loading = true;
            try {
                let url = "branch";
                const response = await axios.get(url);
                this.branches = response.data.data.branches;
                setTimeout(() => {
                    this.loading = false;
                }, 300); // set timeout to 1 second
            } catch (error) {}
        },
    },

});

