import { defineStore } from "pinia";
import axios from "axios";
import router from "../../router.js";
import moment from "moment";

export const usePostsStore = defineStore("postsStore", {
    state: () => ({
        posts: [],
        post: {},
        perPage: 5,
        limit: 4,
        search: null,
        currentPage: 1,
        loading: false,
        rows: null,
        options: [
            { value: 5, text: "5" },
            { value: 10, text: "10" },
            { value: 50, text: "50" },
            { value: 100, text: "100" },
        ],
    }),

    getters: {},

    actions: {
        dateTime(value) {
            return moment(value).format("MMM D, Y");
        },

        setPerPage(value) {
            this.perPage = value;
            this.currentPage = 1;
            this.getPosts();
        },

        async getPosts() {
            this.loading = true;
            try {
                let url = "post";
                if (this.perPage) {
                    url += `?perPage=${this.perPage}`;
                }
                if (this.search) {
                    url += `${this.perPage ? "&" : "?"}search=${this.search}`;
                }
                if (this.currentPage > 1) {
                    url += `${this.perPage || this.search ? "&" : "?"}page=${
                        this.currentPage
                    }`;
                }
                const response = await axios.get(url);
                this.posts = response.data.data.posts.data;
                if (this.search) {
                    this.currentPage = 1;
                } else {
                    this.currentPage = response.data.data.posts.current_page;
                }

                this.rows = response.data.data.posts.total;

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
        async getPost(id) {
            this.loading = true;
            try {
                const response = await axios.get("post/" + id);

                this.post = response.data.data.post;
                // this.loading = false;
            } catch (error) {
                this.post = {};
                router.push({ name: "blog" });
            }
        },
        setCurrentPage(pageNumber) {
            this.currentPage = pageNumber;
        },
    },
});
