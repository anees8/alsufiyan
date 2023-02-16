import {defineStore } from 'pinia';
import axios from 'axios';
import router from '../../router.js';


export const useLoginStore = defineStore('loginStore',{
  state: () => ({
    user:{
    email: 'admin@example.com',
    password: 'Anees@123',
   
  }, 
    loading:false,  
   
    accessToken: localStorage.getItem('token') || null,
    errors:{},
    
  }),

  getters:{
    getAccessToken:state =>state.accessToken,
  },
  mutations: {

 
  
  },
  actions: {
    async login() {
      this.loading = true;
      try {
        const response = await  axios.post('login',this.user );
          this.setToken(response.data.data.token); 
   
      } catch (error) {
          if(error.response){
        this.errors=error.response.data.errors;
      }
       
        
      }
      
    },

    setToken:function(token){
    this.accessToken=token;
    localStorage.setItem('token',token);
    this.errors={};
    this.user.email=null;
    this.user.password=null;
    router.push({ name: "Dashboard" });
    },
    removeToken:function(){
      this.accessToken=null;
      localStorage.removeItem('token');
      router.push({ name: "Login" });
    },
    
  }




})
