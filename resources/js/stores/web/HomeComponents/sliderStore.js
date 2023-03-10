import { defineStore } from "pinia";
import axios from "axios";


export const useSliderStore = defineStore("sliderStore", {


    state: () => ({
        sliders: [
            {
              id: 1,
              src: "HomeSlider/1.jpg",
            },
            {
              id: 2,
              src: "HomeSlider/2.jpg",
            },
            {
              id: 3,
              src: "HomeSlider/3.jpg",
            },
            {
              id: 4,
              src: "HomeSlider/4.jpg",
            },
            {
              id: 5,
              src: "HomeSlider/5.jpg",
            },
          ],
          itemsToShow: 1,
       
          
        }),
        
        actions: {

        },
    });