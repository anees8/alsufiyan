<template>
  <div>
    <b-container class="router_view_min py-5" v-if="loading">
      <b-row>
        <div class="image-grid">
          <div v-for="image in 10" :key="image" class="image-container">
            <b-skeleton
              type="image"
              class="image img-fluid rounded shadow-lg hover-shadow"
            ></b-skeleton>
          </div>
        </div>
      </b-row>
      <b-row align-h="end" class="mt-5">
        <b-col lg="1" md="2" class="p-2">
          <b-skeleton type="input"></b-skeleton>
        </b-col>
        <b-col lg="4" md="6" class="p-2">
          <b-skeleton type="input"></b-skeleton>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="router_view_min py-5" v-else>
      <b-row>
        <div class="image-grid">
          <div v-for="(image, index) in images" :key="index" class="image-container">
            <b-img
              loading="lazy"
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
      <b-row align-h="end" class="mt-5">
        <b-col lg="1" md="2" class="p-2">
          <b-form-select
            v-if="rows > 5"
            v-model="perPage"
            :options="options"
            size="md"
            v-on:change="setPerPage"
            varient="dark"
          ></b-form-select>
        </b-col>
        <b-col lg="4" md="6" class="p-2">
          <b-pagination
            v-if="rows / perPage > 1"
            v-on:click="getImages"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            :limit="limit"
          ></b-pagination>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useImagesStore } from "../../stores/web/imagesStore.js";
const {
  images,
  options,
  perPage,
  currentPage,
  rows,
  visible,
  currentindex,
  loading,
  limit,
} = storeToRefs(useImagesStore());

const { getImages, setPerPage, show, handleHide } = useImagesStore();

getImages();
</script>
<style scoped>
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
