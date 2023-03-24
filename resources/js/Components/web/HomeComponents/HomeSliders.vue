<template>
  <div v-if="loading">
    <carousel :items-to-show="itemsToShow" :autoplay="2000" :wrap-around="true">
      <slide v-for="slider in 5" :key="slider">
        <b-skeleton
          type="image"
          animation="fade"
          class="d-block w-100 home_carousel_img"
        ></b-skeleton>
      </slide>
      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </div>
  <div v-else>
    <carousel :items-to-show="itemsToShow" :autoplay="2000" :wrap-around="true">
      <slide v-for="slider in sliders" :key="slider.id">
        <img
          loading="lazy"
          :src="slider.src"
          class="d-block w-100 home_carousel_img"
          alt="..."
        />
      </slide>
      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </div>
</template>

<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

import { storeToRefs } from "pinia";
import { useSliderStore } from "../../../stores/web/HomeComponents/sliderStore";
const { sliders, itemsToShow, loading } = storeToRefs(useSliderStore());
const { getSliderImages } = useSliderStore();
getSliderImages();
</script>
<style scoped>
.home_carousel_img {
  width: 100%;
  height: calc(100vh - 100px); /* adjust the height based on the navbar height*/
}
</style>
