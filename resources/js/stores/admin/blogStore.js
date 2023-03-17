import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment";

export const useAdminBlogsStore = defineStore("adminblogsStore", {
state: () => ({
        fields: [
        { key: "id", label: "ID" },
        { key: "title", label: "Title" ,thStyle: { width: "15%" }},
        { key: "attachment", label: "Image" ,thStyle: { width: "10%" }},
        { key: "content", label: "Description",thStyle: { width: "50%" } },
        { key: "username", label: "Username" },
        { key: "created_at", label: "Created Date" },
        { key: "actions", label: "Action" },
        ],
        posts: [],
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
        errors: { }, 
        loading:false,
        modal: false,  
         post:{
            edit_id:null,
         },

        }),
        

            actions: {
            async getPosts() {
            this.isBusy = true;
            try {
            let url = "posts";
            if (this.perPage) {
            url += `?perPage=${this.perPage}`;
            }
            if (this.currentPage > 1) {
            url += `${this.perPage ? "&" : "?"}page=${
            this.currentPage
            }`;
            }
            const response = await axios.get(url);
            this.posts = response.data.data.posts.data;

            this.currentPage = response.data.data.posts.current_page;
            this.rows = response.data.data.posts.total;

            this.isBusy = false;
            } catch (error) {
            if (error.response) {
            this.errors = error.response.data.errors;
            }
            this.isBusy = false;
            }
            }, 
            
    onFileChange: function (e) {
        this.post.image = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
        this.post.previewImage = reader.result;
        };
},

            dateTime(value) {
            return moment(value).format("D-MMM-Y");
            }, 
            setPerPage(value) {
            this.perPage = value;
            this.currentPage = 1;
            this.getPosts();
            },
            resetForm() {
            this.errors = {};


            this.loading = false;
            },
            hideModel(){
            this.modal = !this.modal;

            this.post={
            edit_id:null,
            },
            this.getPosts();
            this.resetForm();
            },

            async uploadData() {
    
                if(!this.post.id){
                   
                const formData = new FormData();

                if(this.post.image){
                formData.append('image',this.post.image);
                }
                if(this.post.title){
                formData.append('title',this.post.title);
                }
                if(this.post.content){
                formData.append('content',this.post.content);
                }
    
                let config={
                header:{ "content-type": "multipart/form-data",
                },
    
                };
                this.loading = true;
            
                try {
                let url = "posts";
                const response = await axios.post(url,formData,config);
                
              
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
                let url = "posts/";
                const formData = new FormData();
                if(this.post.image){
                    formData.append('image',this.post.image);
                    }
                    if(this.post.title){
                    formData.append('title',this.post.title);
                    }
                    if(this.post.content){
                    formData.append('content',this.post.content);
                    }
              
                formData.append('_method','put');
                let config={
                header:{ 'Content-Type': 'multipart/form-data'},
                
                };
                const response = await axios.post(url+this.post.id,formData,config);
              
               
                this.hideModel();
    
                } catch (error) {
                if (error.response) {
                this.errors = error.response.data.errors;
                }
                this.loading = false;
    
                }
    
                 }
        },
    
        editPost(id){
        this.post =this.posts.find(post=>post.id==id);
        if(this.post){
            this.post.previewImage = this.post.attachment;
        this.modal = !this.modal;
        }
        
        
            },

            deletePost(id){
                Swal.fire({
                    title: 'Are you sure?',
                    text:  "Do you want to Delete this Post : " + id,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: 'Yes, delete',
                    cancelButtonText: 'No, cancel'
                    }).then((result) => {
                    if (result.isConfirmed) {
        
                    let url = "posts/";
        
                    axios
                    .delete(url + id)
                    .then((res) => {
                    this.getPosts();
                    Swal.fire("Deleted!", "Your Blog Post has been deleted.", "success");
                    })
                    .catch((error) => {
                    this.errors = error.response.data.errors;
                    });
                    }
                    });

            }



            },
        
});