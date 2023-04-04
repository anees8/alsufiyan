import { defineStore } from "pinia";
import axios from "axios";
import router from "../../router";


export const useContactStore = defineStore("contactStore", {
    state: () => ({
        contactForm: {
            name: null,
            email: null,
            phone: null,
            subject_id: null,
            message: null,
        },
        options: [],
        errors: {},
        modal:false,
        message: "",
        loading: false,
    }),

    actions: {
        changeModel(){
            this.modal=true;
        },
        async contact() {
            this.loading = true;

            try {
                const response = await axios.post(
                    "contactForm",
                    this.contactForm
                );
                this.showMessage(response.data.message);
            } catch (error) {
                if (error.response) {
                    this.errors = error.response.data.errors;
                }
                this.loading = false;
            }
        },

        async get_subject() {
            this.loading = true;
            try {
                const response = await axios.get("contactSubject");

                this.options = response.data.data.subject;
                this.options.push({
                    value: null,
                    text: "Please select an option",
                    disabled: true,
                });

                this.loading = false;
            } catch (error) {
                if (error.response) {
                    this.errors = error.response.data.errors;
                }
                this.loading = false;
            }
        },
        showMessage: function (message) {
            this.message = message;
            this.errors = {};
            this.contactForm = {
                name: null,
                email: null,
                phone: null,
                subject_id: null,
                message: null,
            };
            this.loading = false;
            setTimeout(() => {
                this.message = null;
            }, 5000);
        },

        resetForm: function () {
            this.errors = {};
            this.message = "";
            this.contactForm = {
                name: null,
                email: null,
                phone: null,
                subject_id: null,
                message: null,
            };
        },
    },
});
