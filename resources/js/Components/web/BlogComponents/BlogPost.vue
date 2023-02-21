<template>
  <b-col v-for="(post, index) in posts" :key="index" class="mb-4 col-12 col-md-4">
    <b-card class="hover-shadow">
      <b-card-img
        :src="post.attachment"
        alt="Image"
        class="img-fluid d-block rounded gallery_img w-100"
        style="height: 22rem"
      />
      <b-card-body>
        <b-card-title>{{ post.title.substring(0, 25) + "..." }}</b-card-title>
        <b-card-text>{{ post.content.substring(0, 160) + "..." }}</b-card-text>

        <router-link
          class="btn btn-outline-dark float-end"
          :to="{
            path: '/post/' + post.id,
          }"
          >Read More<font-awesome-icon class="ms-2" icon="arrow-right"
        /></router-link>
      </b-card-body>
    </b-card>

    <!-- :to="'/post/' + post.id" -->
  </b-col>

  <div class="d-flex justify-content-end my-4">
    <div class="me-4">
      <b-form-select
        v-model="perPage"
        :options="options"
        size="md"
        @click="getPosts"
      ></b-form-select>
    </div>
    <div>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        v-on:click="getPosts"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
      ></b-pagination>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { usePostsStore } from "../../../stores/web/postsStore.js";
const { posts, options, perPage, currentPage, rows } = storeToRefs(usePostsStore());
const { getPosts } = usePostsStore();

onMounted(() => {
  getPosts();
});
</script>

<style>
/* Add custom styles here */
</style>
