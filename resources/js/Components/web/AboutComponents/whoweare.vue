<template>
    
<b-container >

    <b-row align-h="center" align-v="stretch">
      <b-col  cols="6" class="text-center my-3">
        <h2 class="fw-normal">WHO WE ARE</h2>
        <p class="py-2  fw-normal " >
          One of the best Hajj, Umrah & Ziyarat service provided in Mysore, most
          comfortable & satisfied service we provide to all our esteem client's
          surrounding our locations. Guidance of Experts with supervision. It is the
          hearts desire of every muslim to be blessed with an opportunity to visit the
          Kabatullah Shareef with their family and their near and dear ones. One of the
          greatest acts of ibadah among Muslims. Better pilgrimage is our motto for all
          pilgrims. We have been setting up benchmarks in trust and commitments
        </p>
      </b-col>
      <b-col  cols="6" class="text-center my-3">
        <carousel :items-to-show="itemsToShow" :autoplay="2000" :wrap-around="true" middleSlide>
    <slide v-for="(slider) in sliders" :key="slider.id" >
       
      <img :src="slider.src" class="d-block w-100  home_carousel_img" alt="..." />
    </slide>
    <template #addons>
      <navigation />
     
    </template>
  </carousel>
      </b-col>
    </b-row>
  </b-container>
</template>
<script setup>
import { ref } from "vue";
import HomeCounter from "../HomeComponents/HomeCounter.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";

import { storeToRefs } from "pinia";
import { useSliderStore } from "../../../stores/web/HomeComponents/sliderStore";
const { sliders, itemsToShow } = storeToRefs(useSliderStore());
const { getSliderImages } = useSliderStore();
const loading = ref(false);
getSliderImages();
</script>
<style scoped>
.home_carousel_img {
  width: 100%;
  height:350px; /* adjust the height based on the navbar height*/
}
</style>

  