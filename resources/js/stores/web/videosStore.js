import { defineStore } from "pinia";
import axios from "axios";
import router from "../../router.js";

export const useVideosStore = defineStore("videosStore", {
    state: () => ({
        videos: [],
        perPage: 5,
        currentPage: 1,
        limit: 4,
        loading: false,
        rows: null,
        options: [
            { value: 5, text: "5" },
            { value: 10, text: "10" },
            { value: 50, text: "50" },
            { value: 100, text: "100" },
        ],
    }),

    actions: {
        setPerPage(value) {
            this.currentPage = 1;
            this.perPage = value;
            this.getVideos();
        },

        async getVideos() {
            this.loading = true;
            try {
                let url = "video";
                if (this.perPage) {
                    url += `?perPage=${this.perPage}`;
                }
                if (this.currentPage > 1) {
                    url += `${this.perPage ? "&" : "?"}page=${
                        this.currentPage
                    }`;
                }
                const response = await axios.get(url);
                this.videos = response.data.data.videos.data;
                this.currentPage = response.data.data.videos.current_page;
                this.rows = response.data.data.videos.total;
                setTimeout(() => {
                    this.loading = false;
                  }, 300); // set timeout to 1 second
               
            } catch (error) {
                if (error.response) {
                    this.errors = error.response.data.errors;
                }
                // this.loading = false;
            }
        },
    },
});
