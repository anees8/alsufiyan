import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment";

export const useAdminImagesStore = defineStore("adminimagesStore", {
state: () => ({
                fields: [
                { key: "id", label: "ID" },
                { key: "image", label: "Image" },
                { key: "username", label: "Username" },
                { key: "created_at", label: "Created Date" },
                { key: "actions", label: "Action" },
                ],
                images: [],
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
                loading:false,
                modal: false,           
                edit_id: null,
                imageTypes:[
                    { value: 1, text: "File" },
                    { value: 2, text: "Image Url" },
                    ],
                imageType:1,
                image:null,
                image_url:null,
                previewImage: null,
                errors: {},
    }),

actions: {
    async getImages() {
                this.isBusy = true;
                try {
                let url = "images";
                url += `?with_deleted`;
                if (this.perPage) {
                url += `&perPage=${this.perPage}`;
                }
                if (this.currentPage > 1) {
                url += `&page=${
                this.currentPage
                }`;
                }
                const response = await axios.get(url);
                this.images = response.data.data.images.data;

                this.currentPage = response.data.data.images.current_page;
                this.rows = response.data.data.images.total;

                this.isBusy = false;
                } catch (error) {
                if (error.response) {
                this.errors = error.response.data.errors;
                }
                this.isBusy = false;
                }
    }, 

    async uploadFile() {
    
            if(!this.edit_id){
            const formData = new FormData();
            
            // formData.append('image', this.image);
            if(this.image){
            formData.append('image',this.image);
            }
            if(this.image_url){
                formData.append('url',this.image_url);
            }           

            let config={
            header:{ "content-type": "multipart/form-data",
            },

            };
            this.loading = true;
        
            try {
            let url = "images";
            const response = await axios.post(url,formData,config);
            this.imageType=1;
           
            this.hideModel();
            } catch (error) {
             
            if (error.response) {
            this.errors = error.response.data.errors;
            }
            this.loading = false;
            }
            }else{
            this.loading = true;
            try {
            let url = "images/";
            const formData = new FormData();

            if(this.image){
            formData.append('image',this.image);
            }
            if(this.image_url){
            formData.append('url',this.image_url);
            }  
            formData.append('_method','put');
            let config={
            header:{ 'Content-Type': 'multipart/form-data'},
            
            };
            const response = await axios.post(url+this.edit_id,formData,config);
            this.imageType=1;
            
            this.hideModel();

            } catch (error) {
            if (error.response) {
            this.errors = error.response.data.errors;
            }
            this.loading = false;

            }

            }
    },

    editImage(id){
        let img =this.images.find(img=>img.id==id);
        if(img){
        this.edit_id=id;
        this.imageType=1;
        this.previewImage=img.src;
        this.modal = !this.modal;
    }


    },

    deleteImage(id){
        Swal.fire({
            title: 'Are you sure?',
            text:  "Do you want to Delete Permanently this Image : " + id,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: 'Yes, Delete',
            cancelButtonText: 'No, cancel'
            }).then((result) => {
            if (result.isConfirmed) {

            let url = "images/forcedelete/";

            axios
            .get(url + id)
            .then((res) => {
            this.getImages();
            Swal.fire("Deleted!", "Image has been deleted.", "success");
            })
            .catch((error) => {
            this.errors = error.response.data.errors;
            });
            }
            });

    },
    recycleImage(id){
        Swal.fire({
            title: 'Are you sure?',
            text:  "Do you want to Recycle this Image : " + id,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#6c757d",
            cancelButtonColor: "#3085d6",
            confirmButtonText: 'Yes, Recycle',
            cancelButtonText: 'No, cancel'
            }).then((result) => {
            if (result.isConfirmed) {

            let url = "images/"; 

            axios
            .delete(url + id)
            .then((res) => {
            this.getImages();
            Swal.fire("Recycled!", "Image has been Recycled.", "success");
            })
            .catch((error) => {
            this.errors = error.response.data.errors;
            });
            }
            });



    },
    restoreImage(id){
        Swal.fire({
            title: 'Are you sure?',
            text:  "Do you want to Restore this Image : " + id,
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: "#0d6efd",
            cancelButtonColor: "#3085d6",
            confirmButtonText: 'Yes, Restore',
            cancelButtonText: 'No, cancel'
            }).then((result) => {
            if (result.isConfirmed) {
            let url = "images/restore/";
            axios
            .get(url + id)
            .then((res) => {
            
            this.getImages();
            Swal.fire("Restored", "Image has been Restored.", "success");
            })
            .catch((error) => {
            this.errors = error.response.data.errors;
            });
            }
            });

    },

   
    dateTime(value) {
         return moment(value).format("D-MMM-Y");
    },

    setPerPage(value) {
        this.perPage = value;
        this.currentPage = 1;
        this.getImages();
    },

    onFileChange: function (e) {
            this.image = e.target.files[0];            ;
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
            this.previewImage = reader.result;
            };
    },

    resetForm(){
            this.errors = {};
            this.message = "";
            const input = document.getElementById('image');
            if (input) {
            input.value = '';
            }
        
            
            this.image=null;
            if(!this.edit_id){
            this.previewImage=null;
            }
            this.image_url=null;
        
            
            this.loading = false;
    },

    hideModel(){
        this.modal = !this.modal;
        this.previewImage=null;
        this.imageType=1;
        this.edit_id=null;
        this.getImages();
        this.resetForm();
    },
    
    },
    });
