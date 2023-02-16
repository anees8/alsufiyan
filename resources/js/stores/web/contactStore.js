import {defineStore } from 'pinia';
import axios from 'axios';
import router from '../../router';


export const useContactStore = defineStore('contactStore',{
  state: () => ({
    contactForm:{
    name:'',
    email:'',
    phone:'',
    subject:'',
    message:'',
  },    
  errors:{},
  message:'',
  loading : false, 
  }),

 
  actions: {
    async contact() {
      this.loading = true;
        try {
        const response = await  axios.post('contactForm',this.contactForm );
          this.message=response.message;
        } catch (error) {
        if(error.response){
        this.errors=error.response.data.errors;
        }
       
        
      }
      
    },
    
  }




})
