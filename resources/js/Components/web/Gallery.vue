<template>
  <Loader v-if="loading" />

  <b-container v-else class="router_view_min py-5">
    <b-row>
      <b-col sm="12" md="4" class="p-1" v-for="(image, index) in images" :key="image.id">
        <img
          :src="image.src"
          alt=""
          @click="show(index)"
          class="thumbnail img-container img-fluid d-block rounded gallery_img shadow-lg w-100 hover-shadow"
          style="height: 21rem"
        />
      </b-col>
      <b-col>
        <vue-easy-lightbox
          :visible="visible"
          :imgs="images"
          :index="currentindex"
          @hide="handleHide"
        ></vue-easy-lightbox>
      </b-col>
    </b-row>
    <b-row align-h="between" class="mt-5">
      <b-col cols="8" md="2" lg="1">
        <b-form-select
          v-model="perPage"
          :options="options"
          size="md"
          v-on:change="setPerPage"
          varient="dark"
        ></b-form-select>
      </b-col>
      <b-col cols="12" md="6" lg="2">
        <b-pagination
          v-on:click="getImages"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          first-text="First"
          prev-text="Prev"
          next-text="Next"
          last-text="Last"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import Loader from "../common/loader.vue";
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
} = storeToRefs(useImagesStore());

const { getImages, setPerPage, show, handleHide } = useImagesStore();

onMounted(() => {
  getImages();
});
</script>
