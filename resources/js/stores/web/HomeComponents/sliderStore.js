import { defineStore } from "pinia";
import axios from "axios";


export const useSliderStore = defineStore("sliderStore", {


    state: () => ({
        sliders: [],
          itemsToShow: 1,
       
          
        }),
        
        actions: {
          async getSliderImages() {
            this.loading = true;
            try {
            let url = "homesliders";
            const response = await axios.get(url); 
            this.sliders = response.data.data.sliders;
            } catch (error) {
            }
            },
            },
    });