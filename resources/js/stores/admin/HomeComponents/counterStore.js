import { defineStore } from "pinia";
import axios from "axios";
import router from "../../../router.js";

export const useAdminCountersStore = defineStore("admincountersStore", {
    state: () => ({
        counters: [],
        counter: {},
        modal: false,
        errors: {},
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
                let url = "homecounters";
                 url += `?permission`;
                const response = await axios.get(url);
                this.counters = response.data.data.counter;
            } catch (error) {
                if (error.response.status === 403) {
                    router.push({ name: "NotAuthorize" });
                } else if (error.response.status === 400) {
                    if (error.response) {
                        this.errors = error.response.data.errors;
                    }
                }
                setTimeout(() => {
                    this.errors = {};
                }, 5000);
            }
        },
        editHomeCounter(id) {
            this.counter = this.counters.find((counter) => counter.id == id);
            this.modal = !this.modal;
        },
        hideModel() {
            this.modal = !this.modal;
            this.counter = {};
            this.getCounter();
        },
        async updateCounter() {
            try {
                let config = {
                    header: { "content-type": "multipart/form-data" },
                };
                const formData = new FormData();
                if (this.counter.id) {
                    formData.append("counters", this.counter.counter);
                }
                formData.append("_method", "put");
                let url = "homecounters/";

                const response = await axios.post(
                    url + this.counter.id,
                    formData,
                    config
                );

                this.hideModel();
            } catch (error) {
                if (error.response.status === 403) {
                    router.push({ name: "NotAuthorize" });
                } else if (error.response.status === 400) {
                    if (error.response) {
                        this.errors = error.response.data.errors;
                    }
                    setTimeout(() => {
                        this.errors = {};
                    }, 5000);
                }
                this.loading = false;
            }
        },
    },
});
