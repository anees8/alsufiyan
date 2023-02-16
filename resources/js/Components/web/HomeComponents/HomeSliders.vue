<template>
  <carousel :items-to-show="itemsToShow" :autoplay="2000" :wrap-around="true">
    <slide v-for="(pack, index) in packages" :key="pack.id">
      <img :src="pack.src" class="d-block w-100 home_carousel_img" alt="..." />
    </slide>
    <template #addons>
      <navigation />
      <!-- <pagination /> -->
    </template>
  </carousel>
</template>
<script>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default {
  name: "App",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      packages: [
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
    };
  },
};
</script>
<style scoped>
.home_carousel_img {
  width: 100%;
  height: calc(100vh - 258px); /* adjust the height based on the navbar height*/
}
</style>
