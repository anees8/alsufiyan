import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment";
import router from "../../../router.js";

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
                slider:{
                    edit_id:null,
                    imageType:1,
                    image:null,
                    image_url:null,
                    content:null,
                    previewImage: null,
                 },
              
                imageTypes:[
                    { value: 1, text: "File" },
                    { value: 2, text: "Image Url" },
                    ],              
                errors: {},
    }),

actions: {
    async getHomesliders() {
                this.isBusy = true;
                try {
                let url = "homesliders";
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
              
                this.sliders = response.data.data.sliders.data;

                this.currentPage = response.data.data.sliders.current_page;
                this.rows = response.data.data.sliders.total;

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

    async uploadFile() {
    
            if(!this.slider.edit_id){
            const formData = new FormData();
            
            // formData.append('image', this.image);
            if(this.slider.image){
            formData.append('image',this.slider.image);
            }
            if(this.slider.image_url){
                formData.append('url',this.slider.image_url);
            }           
            if(this.slider.content){
                formData.append('content',this.slider.content);
            }
            
            let config={
            header:{ "content-type": "multipart/form-data",
            },

            };
            this.loading = true;
        
            try {
            let url = "homesliders";
            const response = await axios.post(url,formData,config);
            this.slider.imageType=1;
          
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

            if(this.slider.image){
            formData.append('image',this.slider.image);
            }
            if(this.slider.image_url){
            formData.append('url',this.slider.image_url);
            }  
            if(this.slider.content){
            formData.append('content',this.slider.content);
        }
            formData.append('_method','put');
            let config={
            header:{ 'Content-Type': 'multipart/form-data'},
            
            };
            const response = await axios.post(url+this.slider.edit_id,formData,config);
            this.slider.imageType=1;
          
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
        this.slider.edit_id=id;
        this.slider.imageType=1;
        this.slider.content=slider.content;
        this.slider.previewImage=slider.image;
        this.modal = !this.modal;
    }


    },

    deleteHomeSlider(id){
        Swal.fire({
            title: 'Are you sure?',
            text:  "Do you want to Delete Permanently this Home Slider : " + id,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: 'Yes, Delete',
            cancelButtonText: 'No, cancel'
            }).then((result) => {
            if (result.isConfirmed) {

            let url = "homesliders/forcedelete/";

            axios
            .get(url + id)
            .then((res) => {
            this.getHomesliders();
            Swal.fire("Deleted!", "Home Slider has been deleted.", "success");
            })
            .catch((error) => {
            this.errors = error.response.data.errors;
            });
            }
            });

    },
    recycleHomeSlider(id){
        Swal.fire({
            title: 'Are you sure?',
            text:  "Do you want to Recycle this HomeSlider : " + id,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#6c757d",
            cancelButtonColor: "#3085d6",
            confirmButtonText: 'Yes, Recycle',
            cancelButtonText: 'No, cancel'
            }).then((result) => {
            if (result.isConfirmed) {

            let url = "homesliders/"; 

            axios
            .delete(url + id)
            .then((res) => {
            this.getHomesliders();
            Swal.fire("Recycled!", "HomeSlider has been Recycled.", "success");
            })
            .catch((error) => {
            this.errors = error.response.data.errors;
            });
            }
            });



    },
    restoreHomeSlider(id){
        Swal.fire({
            title: 'Are you sure?',
            text:  "Do you want to Restore this HomeSlider : " + id,
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: "#0d6efd",
            cancelButtonColor: "#3085d6",
            confirmButtonText: 'Yes, Restore',
            cancelButtonText: 'No, cancel'
            }).then((result) => {
            if (result.isConfirmed) {
            let url = "homesliders/restore/";
            axios
            .get(url + id)
            .then((res) => {
            
            this.getHomesliders();
            Swal.fire("Restored", "HomeSlider has been Restored.", "success");
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
            this.slider.image = e.target.files[0];            ;
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
            this.slider.previewImage = reader.result;
            };
    },

    resetForm(){
            this.errors = {};
            this.message = "";
            const input = document.getElementById('image');
            if (input) {
            input.value = '';
            }
        
            
            this.slider.image=null;
            if(!this.slider.edit_id){
            this.slider.previewImage=null;
            }
            this.slider.image_url=null;
            this.slider.content=null;
            
            this.loading = false;
    },

    hideModel(){
        this.modal = !this.modal;
        this.slider.previewImage=null;
        this.slider.imageType=1;
        this.slider.edit_id=null;
        this.getHomesliders();
        this.resetForm();
    },
    
    },
    });
