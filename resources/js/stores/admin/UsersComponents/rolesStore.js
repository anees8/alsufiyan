import { defineStore } from "pinia";
import axios from "axios";

export const useRolesStore = defineStore("rolesStore", {
    state: () => ({
            fields: [
            { key: "id" },
            { key: "name"},
            { key: "permissions"},
            { key: "actions"},
            ],
        roles:[],
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
        badgeVarients:["primary","secondary","success","info","dark"],
      errors: {},
      role:{},
      modal: false, 
    }),

    actions: {
        async getRolesPermission() {
            this.isBusy = true;
            try {
            let url = "roles";
            if (this.perPage) {
                url += `?perPage=${this.perPage}`;
            }
            if (this.currentPage > 1) {
                url += `${this.perPage ? "&" : "?"}page=${
                    this.currentPage
                }`;
            }
            const response = await axios.get(url);
            this.roles = response.data.data.roles.data;
            this.currentPage = response.data.data.roles.current_page;
            this.rows = response.data.data.roles.total;

            this.isBusy = false;
            } catch (error) {

            if (error.response.status === 403) {
            router.push({"name":"NotAuthorize"});
            }else if(error.response.status === 400){
            if (error.response) {
            this.errors = error.response.data.errors;
            }
            }
            this.isBusy = false;
            }
            }, 


            editRoles(id){
                this.role =this.roles.find(role=>role.id==id);
                this.modal = !this.modal;
            },
            deleteRoles(id){
                Swal.fire({
                    title: 'Are you sure?',
                    text:  "Do you want to Delete Permanently this Role : " + id,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: 'Yes, Delete',
                    cancelButtonText: 'No, cancel'
                    }).then((result) => {
                    if (result.isConfirmed) {
        
                        let url = "roles/"; 

                        axios
                        .delete(url + id)
                    .then((res) => {
                    this.getRolesPermission();
                    Swal.fire("Deleted!", "Role has been deleted.", "success");
                    })
                    .catch((error) => {
                    this.errors = error.response.data.errors;
                    });
                    }
                    });
        
            },

            async  uploadData(){

                const formData = new FormData();
                let config={
                header:{ "content-type": "multipart/form-data",
                },
                };


                this.loading = true;
                let url = "roles";

                if(this.role.name){
                formData.append('role',this.role.name);
                }
                if(!this.role.id){

                    try {

                        const response = await axios.post(url,formData,config);
                        if(this.role.name){
                        formData.append('name',this.role.name);
                        }

                        
                        this.hideModel();
                        }catch (error) {

                        if (error.response.status === 403) {
                        router.push({"name":"NotAuthorize"});
                        }else if(error.response.status === 400){
                        if (error.response) {
                        this.errors = error.response.data.errors;
                        }
                        }
                        this.loading = false;
                        }


                }else{
                    formData.append('_method','put');
                    try {
                    const response = await axios.post(url+'/'+this.role.id,formData,config);
                   
                    this.hideModel();
                    }catch (error) {
    
                    if (error.response.status === 403) {
                    router.push({"name":"NotAuthorize"});
                    }else if(error.response.status === 400){
                                    if (error.response.status === 403) {
                    router.push({"name":"NotAuthorize"});
                    }else if(error.response.status === 400){
                    if (error.response) {
                    this.errors = error.response.data.errors;
                    }
                    }
                    }
                    }


                }

            },
            setPerPage(value) {
                this.perPage = value;
                this.currentPage = 1;
                this.getRolesPermission();
                },
                hideModel(){
                    this.modal = !this.modal;
                     this.getRolesPermission();
                    this.resetForm();
                    },
                    resetForm(){
                    this.errors = {};
                    this.role={};
                    this.loading = false;
                        },


    },
});
