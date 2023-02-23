<template>
  <b-container v-if="loading" class="py-5">
    <b-row class="router_view_min" align-v="center" align-h="center">
      <b-col>
        <div class="text-center">
          <b-spinner variant="dark"></b-spinner>
          <strong align-v="center" align-h="center">Loading...</strong>
        </div>
      </b-col>
    </b-row>
  </b-container>
  <div v-else class="router_view_min">
    <div class="container py-5">
      <div class="row">
        <div class="col-12 col-md-4 p-1" v-for="(video, index) in videos" :key="video.id">
          <div class="thumbnail p-1">
            <div class="img-container">
              <iframe
                v-if="video.src.includes('https://www.youtube.com/')"
                width="420"
                height="320"
                :src="video.src"
                allowfullscreen
              >
              </iframe>
              <video v-else width="420" height="320" controls muted>
                <source :src="video.src" />
              </video>
            </div>
          </div>
        </div>
      </div>
      <div></div>

      <div class="d-flex justify-content-end my-4">
        <div class="me-4">
          <b-form-select
            v-model="perPage"
            :options="options"
            v-on:change="setPerPage"
            size="md"
            varient="dark"
          ></b-form-select>
        </div>
        <div>
          <b-pagination
            v-on:click="getVideos"
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
import { useVideosStore } from "../../stores/web/videosStore.js";
const { videos, options, perPage, currentPage, loading, rows } = storeToRefs(
  useVideosStore()
);

const { getVideos, setPerPage } = useVideosStore();

onMounted(() => {
  getVideos();
});
</script>
