import { defineStore } from "pinia";
import axios from "axios";

export const useReviewsStore = defineStore("reviewsStore", {
    state: () => ({
        reviews: [],
        loading: false,
        
    }),


    actions: {
        async getReviews() {
            this.loading = true;
            try {
                let url = "review";
                const response = await axios.get(url);
                this.reviews = response.data.data.reviews;
                setTimeout(() => {
                    this.loading = false;
                }, 300); // set timeout to 1 second
            } catch (error) {}
        },
    },

   
});
