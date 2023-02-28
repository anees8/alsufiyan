import {defineStore } from 'pinia';
import axios from 'axios';
import moment from "moment";




export const useImagesStore = defineStore('imagesStore',{
    state: () => ({
        fields:[
          { key: 'id',label:'ID'}, 
          { key: 'image' ,label:'Image'},
          { key: 'username',label:'Username'}, 
          { key: 'created_at',label:'Created Date'},
          { key: 'actions'}, 
          
      ],
        images: [],
        
        perPage:5,
        currentPage: 1,
        isBusy: false, 
        rows:null,
      options: [
        { value: 5, text: "5" },
        { value: 10, text: "10" },
  
        { value: 50, text: "50" },
        { value: 100, text: "100" },
      ],
    }),

    
actions: {
  dateTime(value) {
    return moment(value).format("D-MMM-Y");
  },
  setPerPage(value) {
  this.perPage = value;
  this.currentPage = 1;
  this.getImages();
  },
 
  async getImages() {
  
  this.isBusy = true;
  try {
  
  
  let url = 'images';
  if (this.perPage) {
  url += `?perPage=${this.perPage}`;
  }
  if (this.currentPage > 1) {
  url += `${this.perPage ? '&' : '?'}page=${this.currentPage}`;
  }
  const response = await  axios.get(url);
  this.images=response.data.data.images.data;
  
  this.currentPage=response.data.data.images.current_page;
  this.rows=response.data.data.images.total;
  
  this.isBusy = false;
  
  } catch (error) {
  
  if(error.response){
  this.errors=error.response.data.errors;
  }
  this.isBusy = false;
  
  }         
  },       
  }
})