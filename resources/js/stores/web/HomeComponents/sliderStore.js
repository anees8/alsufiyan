import { defineStore } from "pinia";
import axios from "axios";

export const useSliderStore = defineStore("sliderStore", {
    state: () => ({
        sliders: [],
        itemsToShow: 1,
        loading: false,
    }),

    actions: {
        async getSliderImages() {
            this.loading = true;
            try {
                let url = "homeslider";
                const response = await axios.get(url);
                this.sliders = response.data.data.sliders;
                setTimeout(() => {
                    this.loading = false;
                }, 300); // set timeout to 1 second
            } catch (error) {
                // this.getSliderImages();
            }
        },
    },
});
