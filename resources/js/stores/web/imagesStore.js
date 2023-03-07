import { defineStore } from "pinia";
import axios from "axios";
import router from "../../router.js";

export const useImagesStore = defineStore("imagesStore", {
    state: () => ({
        images: [],
        perPage: 10,
        currentPage: 1,
        limit: 4,
        loading: false,
        rows: null,
        visible: false,
        currentindex: null,
        options: [
            { value: 5, text: "5" },
            { value: 10, text: "10" },
            { value: 50, text: "50" },
            { value: 100, text: "100" },
        ],
    }),

    actions: {
        setPerPage(value) {
            this.perPage = value;
            this.currentPage = 1;
            this.getImages();
        },
        show(index) {
            this.currentindex = index;
            this.visible = true;
        },
        handleHide() {
            this.visible = false;
        },

        async getImages() {
            this.loading = true;
            try {
                let url = "images";
                if (this.perPage) {
                    url += `?perPage=${this.perPage}`;
                }
                if (this.currentPage > 1) {
                    url += `${this.perPage ? "&" : "?"}page=${
                        this.currentPage
                    }`;
                }
                const response = await axios.get(url);
                this.images = response.data.data.images.data;
                this.currentPage = response.data.data.images.current_page;
                this.rows = response.data.data.images.total;

                this.loading = false;
            } catch (error) {
                if (error.response) {
                    this.errors = error.response.data.errors;
                }
                this.loading = false;
            }
        },
    },
});
