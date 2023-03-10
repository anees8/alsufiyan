<template>
  <b-container class="py-5">
    <b-row>
      <b-col>
        <h2 class="fw-bolder text-dark text-center"><u>Gallery</u></h2>

        <router-link
          class="btn btn-dark float-end mb-3"
          v-bind:to="{
            name: 'gallery',
          }"
          >View All<font-awesome-icon class="ms-2" icon="arrow-right"
        /></router-link>
      </b-col>
    </b-row>
    <b-row>
      <div class="image-grid">
        <div
          v-for="(image, index) in images.slice(0, 3)"
          :key="index"
          class="image-container"
        >
          <img
            :src="image.src"
            @click="show(index)"
            class="image img-fluid rounded shadow-lg hover-shadow"
          />
        </div>
      </div>
    </b-row>
    <vue-easy-lightbox
      :visible="visible"
      :imgs="images"
      :index="currentindex"
      @hide="handleHide"
    ></vue-easy-lightbox>
  </b-container>
</template>

<script setup>
import { storeToRefs } from "pinia";

import { useImagesStore } from "../../../stores/web/HomeComponents/imagesStore";
const { images, visible, currentindex } = storeToRefs(useImagesStore());

const { getImages, show, handleHide } = useImagesStore();

getImages();
</script>
<style scoped>
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.image-container {
  position: relative;
  overflow: hidden;
  padding-bottom: 100%;
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
}
</style>
