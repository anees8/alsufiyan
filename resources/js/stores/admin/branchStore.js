import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment";
import router from "../../router.js";

export const useAboutBranchStore = defineStore("aboutbranchStore", {
    state: () => ({
        branches:[],
        fields: [
            { key: "id", label: "ID" },
            { key: "location", label: "Location" },      
            { key: "image", label: "Image" },   
            { key: "address", label: "Address",thStyle: { width: "15%" }  },    
            { key: "map", label: "Map" ,thStyle: { width: "10%" } },     
            { key: "person", label: "Contact Person" }, 
            { key: "phone", label: "Phone" },       
            { key: "secondary_person", label: "Contact Secondary Person" },     
            { key: "secondary_phone", label: "Secondary Phone" },       
            { key: "actions", label: "Action"  ,thStyle: { width: "10%" }},
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
        branch: {
            id: null,
        },


    }),

    actions: {

       async getBranches(){
            this.isBusy = true;
            try {
                let url = "ourbranchs";
                url += `?permission`;
                if (this.perPage) {
                    url += `&perPage=${this.perPage}`;
                }
                if (this.currentPage > 1) {
                    url += `&page=${this.currentPage}`;
                }
                const response = await axios.get(url);
                this.branches = response.data.data.branches.data;

                this.currentPage = response.data.data.branches.current_page;
                this.rows = response.data.data.branches.total;

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
        async updateBranch() {

            const formData = new FormData();
            let url = "ourbranchs";
            let config = {
                header: { "content-type": "multipart/form-data" },
            };
            this.loading = true;

            if (this.branch.image) {
                formData.append("image", this.branch.image);
            }


            if (!this.branch.id) {
            
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
                        url+'/'+this.branch.id,
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

        editBranch(id) {
            this.branch = this.branches.find((branch) => branch.id == id);
            if (this.branch) {
                this.branch.previewImage = this.branch.image;
                this.modal = !this.modal;
            }
        },
        deleteBranch(id) {
            Swal.fire({
                title: "Are you sure?",
                text: "Do you want to Delete Permanently this Branch : " + id,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, Delete",
                cancelButtonText: "No, cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    let url = "ourbranchs/";

                    axios
                        .delete(url + id)
                        .then((res) => {
                            this.getBranches();
                            Swal.fire(
                                "Deleted!",
                                "Branch has been Deleted Permanently.",
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
        dateTime(value) {
            
            return value?moment(value).format("D-MMM-Y"):null;
        },
      
        onFileChange: function (e) {
            this.branch.image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                this.branch.previewImage = reader.result;
            };
        },
        setPerPage(value) {
            this.perPage = value;
            this.currentPage = 1;
            this.getBranches();
        },
        resetForm() {
            this.errors = {};
            this.isBusy = false;
            this.loading = false;
        },
        hideModel() {
            this.modal = !this.modal;

            this.branch = {
                id: null,
            };
                this.getBranches();
            this.resetForm();
        },

    }
    
    
});
