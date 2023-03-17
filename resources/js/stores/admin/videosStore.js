import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment";
import {ref} from 'vue';
export const useAdminVideosStore = defineStore("adminvideosStore", {
state: () => ({
                fields: [
                { key: "id", label: "ID" , tdClass: 'align-middle'},
                { key: "video", label: "Videos" },
                { key: "username", label: "Username", tdClass: 'align-middle' },
                { key: "created_at", label: "Created Date",tdClass: 'align-middle'  },
                { key: "actions" , label: "Actions", tdClass: 'align-middle' },
                ],
                videos: [],
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
                videoTypes:[
                    { value: 1, text: "File" },
                    { value: 2, text: "Video Url" },
                    ],
                videoType:1,
                video:'',
                video_url:'',
                previewVideo: null,
                errors: {},
    }),

actions: {
    async getVideos() {
                this.isBusy = true;
                try {
                let url = "videos";
                if (this.perPage) {
                url += `?perPage=${this.perPage}`;
                }
                if (this.currentPage > 1) {
                url += `${this.perPage ? "&" : "?"}page=${
                this.currentPage
                }`;
                }
                const response = await axios.get(url);
              
                this.videos = response.data.data.videos.data;

                this.currentPage = response.data.data.videos.current_page;
                this.rows = response.data.data.videos.total;

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
            if(this.video){
            formData.append('video',this.video);
            }
            if(this.video_url){
                formData.append('url',this.video_url);
            }           

            let config={
            header:{ "content-type": "multipart/form-data",
            },

            };
            this.loading = true;
        
            try {
            let url = "videos";
            const response = await axios.post(url,formData,config);
            this.videoType=1;
           
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
            let url = "videos/";
            const formData = new FormData();

            if(this.video){
            formData.append('video',this.video);
            }
            if(this.video_url){
            formData.append('url',this.video_url);
            }  
            formData.append('_method','put');
            let config={
            header:{ 'Content-Type': 'multipart/form-data'},
            
            };
            const response = await axios.post(url+this.edit_id,formData,config);
            this.videoType=1;
           
            this.hideModel();

            } catch (error) {
            if (error.response) {
            this.errors = error.response.data.errors;
            }
            this.loading = false;

            }

            }
    },

    editVideo(id){
        let vid =this.videos.find(vid=>vid.id==id);
        if(vid){
        this.edit_id=id;
        this.videoType=1;
        this.previewVideo=vid.src;
        this.modal = !this.modal;
    }


    },

    deleteVideo(id){
            Swal.fire({
            title: 'Are you sure?',
            text:  "Do you want to Delete this Video : " + id,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'No, cancel'
            }).then((result) => {
            if (result.isConfirmed) {

            let url = "videos/";

            axios
            .delete(url + id)
            .then((res) => {
            this.getVideos();
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
        this.getVideos();
    },

    onFileChange: function (e) {
            this.video = e.target.files[0];            ;
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
            this.previewVideo = reader.result;
            };
    },

    resetForm: function () {
            this.errors = {};
            this.message = "";
            const input = document.getElementById('video');
            if (input) {
            input.value = '';
            }
        
            
            this.video=null;
            if(!this.edit_id){
            this.previewVideo=null;
            }
            this.video_url=null;
        
            
            this.loading = false;
    },

    hideModel: function () {
        this.modal = !this.modal;
        this.previewVideo=null;
        this.videoType=1;
        this.edit_id=null;
        this.getVideos();
        this.resetForm();
    },
    
    },
    });
