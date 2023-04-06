import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment";

export const useAdminReviewsStore = defineStore("adminreviwsStore", {
    state: () => ({
        reviews:[],
        fields: [
            { key: "id", label: "ID" },
      
            { key: "comment", label: "Review",thStyle: { width: "50%" }  },
            { key: "user", label: "Username" },
            { key: "comment_date", label: "Review Date" },
            { key: "actions", label: "Action" },
        ],
      
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
       async getReviews(){
            this.isBusy = true;
            try {
                let url = "clientreviews";
                url += `?permission`;
                if (this.perPage) {
                    url += `&perPage=${this.perPage}`;
                }
                if (this.currentPage > 1) {
                    url += `&page=${this.currentPage}`;
                }
                const response = await axios.get(url);
                this.reviews = response.data.data.reviews.data;

                this.currentPage = response.data.data.reviews.current_page;
                this.rows = response.data.data.reviews.total;

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
        dateTime(value) {
            
            return value?moment(value).format("D-MMM-Y"):null;
        },
        setPerPage(value) {
            this.perPage = value;
            this.currentPage = 1;
            this.getReviews();
        },

    }
    
    
});
