import { defineStore } from "pinia";
import axios from "axios";


export const usePackagesStore = defineStore("packagesStore", {


    state: () => ({
        packages:[],
          breakpoints: {
            // 700px and up
            480: {
              itemsToShow: 1,
              snapAlign: "start",
            },
            // 1024 and up
            768: {
              itemsToShow: 2,
              snapAlign: "start",
            },
            1024: {
              itemsToShow: 3,
              snapAlign: "start",
            },
          },
        }),
        
        actions: {
        
          async getHomePackageSlider() {
            this.loading = true;
            try {
            let url = "homepackageslider";
            const response = await axios.get(url); 
            this.packages = response.data.data.packages;
          
            } catch (error) {
            }
            },
        },
    });