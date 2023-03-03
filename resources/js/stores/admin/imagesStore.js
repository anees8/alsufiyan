import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment";

export const useImagesStore = defineStore("imagesStore", {
state: () => ({
                fields: [
                { key: "id", label: "ID" },
                { key: "image", label: "Image" },
                { key: "username", label: "Username" },
                { key: "created_at", label: "Created Date" },
                { key: "actions" },
                ],
                images: [],
                perPage: 5,
                currentPage: 1,
                isBusy: false,
                loading:false,
                modal: false,
                rows: null,
                options: [
                { value: 5, text: "5" },
                { value: 10, text: "10" },
                { value: 50, text: "50" },
                { value: 100, text: "100" },
                ],              
                edit_id: null,
                image: null,
                previewImage: null,
                errors: {},
    }),

actions: {
    async getImages() {
                this.isBusy = true;
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
            formData.append('image', this.image);
            this.loading = true;
            try {
            let url = "images";
            const response = await axios.post(url,formData);
            this.getImages();
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
            formData.append('image', this.image);
            formData.append('_method','put');
            let config={
            header:{'content_type':'image'},
            };
            const response = await axios.post(url+this.edit_id,formData,config);

            this.getImages();
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
        this.previewImage=img.src;
        this.modal = !this.modal;
    }


    },

    deleteImage(id){
            Swal.fire({
            title: 'Are you sure?',
            text:  "Do you want to Delete this Image : " + id,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'No, cancel'
            }).then((result) => {
            if (result.isConfirmed) {

            let url = "images/";

            axios
            .delete(url + id)
            .then((res) => {
            this.getImages();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
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
            this.image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
            this.previewImage = reader.result;
            };
    },

    resetForm: function () {
            this.errors = {};
            this.message = "";
            const input = document.getElementById('image');
            if (input) {
            input.value = '';
            }

            this.edit_id=null;
            this.image=null;
            this.previewImage=null;

            this.loading = false;
    },

    hideModel: function () {
        this.modal = !this.modal;
        this.resetForm();
    },
    
    },
    });
