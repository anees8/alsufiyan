import { defineStore } from "pinia";
import axios from "axios";

export const useAboutStore = defineStore("aboutStore", {

    state: () => ({
        about:"One of the best Hajj, Umrah & Ziyarat service provided in Mysore, most comfortable & satisfied service we provide to all our esteem client's surrounding our locations. Guidance of Experts with supervision. It is the   hearts desire of every muslim to be blessed with an opportunity to visit the Kabatullah Shareef with their family and their near and dear ones. One of the greatest acts of ibadah among Muslims. Better pilgrimage is our motto for all pilgrims. We have been setting up benchmarks in trust and commitments",
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

