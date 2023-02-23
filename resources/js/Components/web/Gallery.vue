<template>
  <div class="router_view_min">
    <div class="container py-5">
      <div class="row">
        <div class="col-12 col-md-4 p-1" v-for="(image, index) in images" :key="image.id">
          <div class="thumbnail p-2">
            <div class="img-container">
              <img
                :src="image.src"
                alt=""
                @click="show(index)"
                class="img-fluid d-block rounded gallery_img shadow-lg w-100 hover-shadow"
                style="height: 21rem"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <vue-easy-lightbox
          :visible="visible"
          :imgs="images"
          :index="currentindex"
          @hide="handleHide"
        ></vue-easy-lightbox>
      </div>

      <div class="d-flex justify-content-end my-4">
        <div class="me-4">
          <b-form-select
            v-model="perPage"
            :options="options"
            size="md"
            v-on:change="setPerPage"
            varient="dark"
          ></b-form-select>
        </div>
        <div>
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
        </div>
      </div>
    </div>
    <!-- all props & events -->
  </div>
</template>

<script setup>
import { onMounted } from "vue";
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
} = storeToRefs(useImagesStore());

const { getImages, setPerPage, show, handleHide } = useImagesStore();

onMounted(() => {
  getImages();
});
</script>
