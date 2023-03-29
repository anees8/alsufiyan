import { defineStore } from "pinia";
import axios from "axios";

export const useCountersStore = defineStore("countersStore", {
    state: () => ({
        counters: [],
        loading: false,
    }),
    actions: {
        getExperiance(years) {
            const currentYear = new Date().getFullYear();
            const diffYears = currentYear - years;
            return diffYears;
        },
        async getCounter() {
            this.loading = true;
            try {
                let url = "counter";
                const response = await axios.get(url);
                this.counters = response.data.data.counter;
                setTimeout(() => {
                    this.loading = false;
                }, 300); // set timeout to 1 second
            } catch (error) {}
        },
    },
});
