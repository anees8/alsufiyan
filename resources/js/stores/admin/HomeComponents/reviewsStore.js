import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment";
import router from "../../../router.js";

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
        modal: false,
        review: {
            id: null,
        },


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
        editReview(id) {
            this.review = this.reviews.find((review) => review.id == id);
            if (this.review) {
                
                this.modal = !this.modal;
            }
        },
        deleteReview(id) {
            Swal.fire({
                title: "Are you sure?",
                text: "Do you want to Delete Permanently this Review : " + id,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, Delete",
                cancelButtonText: "No, cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    let url = "clientreviews/";

                    axios
                        .delete(url + id)
                        .then((res) => {
                            this.getReviews();
                            Swal.fire(
                                "Deleted!",
                                "Review has been Deleted Permanently.",
                                "success"
                            );
                        })
                        .catch((error) => {
                            if (error.response) {
                                if (error.response.status === 403) {
                                    router.push({ name: "NotAuthorize" });
                                } else if (error.response.status === 400) {
                                        this.errors = error.response.data.errors;
                                }
                            }
                            this.isBusy = false;
                            this.loading = false;
                          
                            setTimeout(() => {
                                this.errors = {};
                            }, 5000);
                        });
                }
            });
        },
       async updateReview(){

        const formData = new FormData();
        let url = "clientreviews";
        let config = {
            header: { "content-type": "multipart/form-data" },
        };
        this.loading = true;
        if (this.review.comment) {
            formData.append("comment", this.review.comment);
        }
        if (this.review.user) {
            formData.append("user", this.review.user);
        }
        if (this.review.comment_date) {
            formData.append("comment_date", this.review.comment_date);
        }

          
        if (!this.review.id) {
            
            try {
                const response = await axios.post(url, formData, config);
                this.hideModel();
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 403) {
                        router.push({ name: "NotAuthorize" });
                    } else if (error.response.status === 400) {
                            this.errors = error.response.data.errors;
                    }
                }
                this.loading = false;
              
                setTimeout(() => {
                    this.errors = {};
                }, 5000);
            }
        } else {
          
            try {
                
                formData.append("_method", "put");
              
                const response = await axios.post(
                    url+'/'+this.review.id,
                    formData,
                    config
                );

                this.hideModel();
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 403) {
                        router.push({ name: "NotAuthorize" });
                    } else if (error.response.status === 400) {
                            this.errors = error.response.data.errors;
                    }
                }
              
                setTimeout(() => {
                    this.errors = {};
                }, 5000);
            }
        }
   
        this.loading = false;


        },
        dateTime(value) {
            
            return value?moment(value).format("D-MMM-Y"):null;
        },
        setPerPage(value) {
            this.perPage = value;
            this.currentPage = 1;
            this.getReviews();
        },
        resetForm() {
            this.errors = {};
            this.isBusy = false;
            this.loading = false;
        },
        hideModel() {
            this.modal = !this.modal;

            this.review = {
                id: null,
            };
                this.getReviews();
            this.resetForm();
        },


    }
    
    
});
