import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment";

export const useAdminSliderStore = defineStore("adminsliderStore", {
state: () => ({
                fields: [
                { key: "id", label: "ID" },
                { key: "image", label: "Image" },
                { key: "content", label: "Content" },
                { key: "username", label: "Username" },
                { key: "created_at", label: "Created Date" },
                { key: "actions", label: "Action" },
                ],
                sliders: [],
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
                content:null,
                previewImage: null,
                errors: {},
    }),

actions: {
    async getHomesliders() {
                this.isBusy = true;
                try {
                let url = "homesliders";
                if (this.perPage) {
                url += `?perPage=${this.perPage}`;
                }
                if (this.currentPage > 1) {
                url += `${this.perPage ? "&" : "?"}page=${
                this.currentPage
                }`;
                }
                const response = await axios.get(url);
              
                this.sliders = response.data.data.sliders.data;

                this.currentPage = response.data.data.sliders.current_page;
                this.rows = response.data.data.sliders.total;

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
            formData.append('content',this.content);
            
            let config={
            header:{ "content-type": "multipart/form-data",
            },

            };
            this.loading = true;
        
            try {
            let url = "homesliders";
            const response = await axios.post(url,formData,config);
            this.imageType=1;
            this.getHomesliders();
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
            let url = "homesliders/";
            const formData = new FormData();

            if(this.image){
            formData.append('image',this.image);
            }
            if(this.image_url){
            formData.append('url',this.image_url);
            }  
            formData.append('content',this.content);
            formData.append('_method','put');
            let config={
            header:{ 'Content-Type': 'multipart/form-data'},
            
            };
            const response = await axios.post(url+this.edit_id,formData,config);
            this.imageType=1;
            this.getHomesliders();
            this.hideModel();

            } catch (error) {
            if (error.response) {
            this.errors = error.response.data.errors;
            }
            this.loading = false;

            }

            }
    },

    editHomeSlider(id){
        let slider =this.sliders.find(slider=>slider.id==id);
        if(slider){
        this.edit_id=id;
        this.imageType=1;
        this.content=slider.content;
        this.previewImage=slider.image;
        this.modal = !this.modal;
    }


    },

    deleteHomeSlider(id){
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

            let url = "homesliders/";

            axios
            .delete(url + id)
            .then((res) => {
            this.getHomesliders();
            Swal.fire("Deleted!", "Your Image has been deleted.", "success");
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
        this.getHomesliders();
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
            this.content=null;
            
            this.loading = false;
    },

    hideModel(){
        this.modal = !this.modal;
        this.previewImage=null;
        this.imageType=1;
        this.edit_id=null;
        this.resetForm();
    },
    
    },
    });
