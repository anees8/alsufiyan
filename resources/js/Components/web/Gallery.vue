<template>
  <Loader v-if="loading" />

  <b-container class="router_view_min py-5" v-else>
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

    <b-row align-h="end" class="mt-5">
      <b-col lg="1" md="2" class="p-2">
        <b-form-select
          v-model="perPage"
          :options="options"
          size="md"
          v-on:change="setPerPage"
          varient="dark"
        ></b-form-select>
      </b-col>
      <b-col lg="4" md="5" class="p-2">
        <b-pagination
          v-on:click="getImages"
          v-model="currentPage"
          :total-rows="rows"
          align="fill"
          :per-page="perPage"
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
