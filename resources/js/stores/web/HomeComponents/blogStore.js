import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment";
export const usePostStore = defineStore("postStore", {
    state: () => ({
        posts: [],
        limit:3,
        loading:false,
    }),

        actions: {
        dateTime(value) {
        return moment(value).format("MMM D, Y");
        },

        async getPosts() {
        this.loading = true;
        try {
        let url = "posts";
        if (this.limit) {
            url += `?perPage=${this.limit}`;
        }

        const response = await axios.get(url);
        this.posts = response.data.data.posts.data;
        // this.loading = false;
        } catch (error) {
        }
        },
        },
});
