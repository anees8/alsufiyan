import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment";

export const useContactSubjectsStore = defineStore("contactsubjectsStore", {
state: () => ({
                fields: [
                { key: "id", label: "ID" },
                { key: "subject", label: "Subject" },
                { key: "created_at", label: "Created Date" },
                { key: "actions", label: "Action" },
                ],
                subjects: [],
                perPage: 5,
                currentPage: 1,
                isBusy: false,
                rows: null,
                options: [
                { value: 5, text: "5" },
                { value: 10, text: "10" },
                { value: 50, text: "50" },
                { value: 100, text: "100" },
                ],   
               
                
                
                errors: {},
    }),

actions: {
    async getContactSubject() {
                this.isBusy = true;
                try {
                let url = "contactSubject";
                if (this.perPage) {
                url += `?perPage=${this.perPage}`;
                }
                if (this.currentPage > 1) {
                url += `${this.perPage ? "&" : "?"}page=${
                this.currentPage
                }`;
                }
                const response = await axios.get(url);
                this.subjects = response.data.data.subject.data;

                this.currentPage = response.data.data.subject.current_page;
                this.rows = response.data.data.subject.total;

                this.isBusy = false;
                } catch (error) {
                if (error.response) {
                this.errors = error.response.data.errors;
                }
                this.isBusy = false;
                }
    }, 



    dateTime(value) {
         return moment(value).format("D-MMM-Y");
    },

    setPerPage(value) {
        this.perPage = value;
        this.currentPage = 1;
        this.getContactSubject();
    },


    },
    });
