import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment";
import router from "../../router.js";

export const useContactsStore = defineStore("contactsStore", {
    state: () => ({
        fields: [
            { key: "id", label: "ID" },
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" },
            { key: "subject", label: "Subject", thStyle: { width: "15%" } },
            { key: "message", label: "Message", thStyle: { width: "40%" } },
            { key: "created_at", label: "Created Date" },
            { key: "actions", label: "Action" },
        ],
        contacts: [],
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
        async getContacts() {
            this.isBusy = true;
            try {
                let url = "contacts";
                url += `?permission`;
                if (this.perPage) {
                    url += `&perPage=${this.perPage}`;
                }
                if (this.currentPage > 1) {
                    url += `&page=${this.currentPage}`;
                }
                const response = await axios.get(url);
                this.contacts = response.data.data.contacts.data;

                this.currentPage = response.data.data.contacts.current_page;
                this.rows = response.data.data.contacts.total;

                this.isBusy = false;
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

        deleteContactSubject(id) {},

        dateTime(value) {
            return moment(value).format("D-MMM-Y");
        },

        setPerPage(value) {
            this.perPage = value;
            this.currentPage = 1;
            this.getContacts();
        },
    },
});
