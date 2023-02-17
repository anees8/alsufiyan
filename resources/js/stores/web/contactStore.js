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

            this.showMessage(response.data.message); 
        
      } catch (error) {
          if(error.response){
        this.errors=error.response.data.errors;
      }
       
      }         
    },
        showMessage:function(message){
        this.message = message;
        this.errors={};
        this.contactForm={
        name:'',
        email:'',
        phone:'',
        subject:'',
        message:'',
        };
        setTimeout(() => {
        this.message = null;
        }, 5000);
        },
   
      resetForm:function(){
      this.errors={};
      this.message='';
      this.contactForm={
      name:'',
      email:'',
      phone:'',
      subject:'',
      message:'',
      };

      },

 
  
    
  }




})
