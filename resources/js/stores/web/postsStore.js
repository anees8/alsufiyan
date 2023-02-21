import {defineStore } from 'pinia';
import axios from 'axios';



export const usePostsStore = defineStore('postsStore',{
    state: () => ({
        posts:[],
        perPage:10,
        currentPage: 1,
        loading:false,  
        rows:null,
      options: [
        { value: 5, text: "5" },
        { value: 10, text: "10" },
        { value: 50, text: "50" },
        { value: 100, text: "100" },
        { value: null, text: "All" },
      ],
    }),

    getters: {
      getperPage: (state) => state.perPage,
    
    },

    actions: {
      
          async getPosts() {

          this.loading = true;
          try {

          const response = await  axios.get('posts/?page='+this.currentPage+'&perPage='+this.getperPage);
         
          this.posts=response.data.data.posts.data;
          this.currentPage=response.data.data.posts.current_page;
          this.rows=response.data.data.posts.total;
          this.perPage=response.data.data.posts.per_page;
          this.loading = false;

          } catch (error) {

          if(error.response){
          this.errors=error.response.data.errors;
          }
          this.loading = false;

          }         

          },
      


    }
    
})