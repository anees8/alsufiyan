import {defineStore } from 'pinia';
import axios from 'axios';
import router from '../../router';


export const useContactStore = defineStore('contactStore',{
  state: () => ({
    contactForm:{
    name:null,
    email:null,
    phone:null,
    subject:null,
    message:null,
  }, 
  options: [
    { value: null, text: 'Please select an option' },
    { value: '1', text: 'Hajj and Umrah package inquiry' },
    { value: '2', text: 'Request for Hajj and Umrah travel information' },
    { value: '3', text: 'Hajj and Umrah booking or reservation' },
    { value: '4', text: 'Feedback on previous Hajj or Umrah trip' },
    { value: '5', text: 'Questions about Hajj or Umrah requirements' },
    { value: '6', text: 'Hajj or Umrah group booking inquiry' },
    { value: '7', text: 'Hajj or Umrah visa application inquiry' },
    { value: '8', text: 'Complaint or dispute related to Hajj or Umrah services' },
    { value: '9', text: 'Others'},

    
  ],
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
      this.loading = false;

      }         
    },
        showMessage:function(message){
        this.message = message;
        this.errors={};
        this.contactForm={
          name:null,
          email:null,
          phone:null,
          subject:null,
          message:null,
        };
        this.loading = false;
        setTimeout(() => {
        this.message = null;
        }, 5000);
        },
   
      resetForm:function(){
      this.errors={};
      this.message='';
      this.contactForm={
        name:null,
    email:null,
    phone:null,
    subject:null,
    message:null,
      };

      },

 
  
    
  }




})
