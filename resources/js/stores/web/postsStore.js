import {defineStore } from 'pinia';
import axios from 'axios';
import router from '../../router.js';



export const usePostsStore = defineStore('postsStore',{
    state: () => ({
        posts:[],
          post: {},
        perPage:5,
        currentPage: 1,
        loading:false,  
        rows:null,
      options: [
        { value: 5, text: "5" },
        { value: 10, text: "10" },
        { value: 50, text: "50" },
        { value: 100, text: "100" },
      ],
    }),

   
    getters: {
      
  
    },

    actions: {
      setPerPage(value) {
        this.perPage = value;
       this.getPosts();
      },
         
          async getPosts() {

          this.loading = true;
          try {


          let url = 'posts';
          if (this.perPage) {
          url += `?perPage=${this.perPage}`;
          }
          if (this.currentPage > 1) {
          url += `${this.perPage ? '&' : '?'}page=${this.currentPage}`;
          }
          const response = await  axios.get(url);
          this.posts=response.data.data.posts.data;
          this.currentPage=response.data.data.posts.current_page;
          this.rows=response.data.data.posts.total;
     
          this.loading = false;

          } catch (error) {

          if(error.response){
          this.errors=error.response.data.errors;
          }
          this.loading = false;

          }         

          },
          async getPost(id) {
          
          try {
            const response = await  axios.get('posts/' + id);
          this.post=response.data.data.post;
          } catch (error) {
            router.push({ name: "blog" });         
          }
          },
          setCurrentPage(pageNumber) {
            this.currentPage = pageNumber
          },
        

    }
    
})