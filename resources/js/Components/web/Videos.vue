<template>
  <Loader v-if="loading" />
  <div v-else class="router_view_min">
    <div class="container py-5">
      <div class="row">
        <div class="col-12 col-md-4" v-for="(video, index) in videos" :key="video.id">
          <div class="thumbnail p-1">
            <div class="img-container">
              <iframe
                v-if="video.src.includes('https://www.youtube.com/')"
                height="320"
                :src="video.src"
                allowfullscreen
              >
              </iframe>
              <video v-else height="320" controls muted>
                <source :src="video.src" />
              </video>
            </div>
          </div>
        </div>
      </div>
      <div></div>

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
            v-on:click="getVideos"
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
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import Loader from "../common/loader.vue";
import { useVideosStore } from "../../stores/web/videosStore.js";
const { videos, options, perPage, currentPage, loading, rows } = storeToRefs(
  useVideosStore()
);

const { getVideos, setPerPage } = useVideosStore();

onMounted(() => {
  getVideos();
});
</script>
