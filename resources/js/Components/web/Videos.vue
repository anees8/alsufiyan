<template>
  <div>
    <b-container v-if="loading" class="router_view_min py-5">
      <b-row>
        <b-col sm="12" md="4" class="p-2" v-for="video in 5" :key="video">
          <b-skeleton type="video" width="100%" style="height: 350px"></b-skeleton>
        </b-col>
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

    <b-container v-else class="router_view_min py-5">
      <b-row>
        <b-col sm="12" md="6" lg="4" class="p-2" v-for="video in videos" :key="video.id">
          <iframe
            v-if="video.src.includes('https://www.youtube.com/')"
            height="350"
            class="w-100"
            :src="video.src"
            :thumbnail="slogo"
            allowfullscreen
          >
          </iframe>
          <video v-else height="350" class="w-100" controls muted>
            <source :src="video.src" />
          </video>
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
            v-on:click="getVideos"
            v-model="currentPage"
            :total-rows="rows"
            :limit="limit"
            :per-page="perPage"
          ></b-pagination>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useVideosStore } from "../../stores/web/videosStore.js";
const { videos, options, perPage, limit, currentPage, loading, rows } = storeToRefs(
  useVideosStore()
);

const { getVideos, setPerPage } = useVideosStore();

getVideos();
</script>
