<template>
  <b-col
    v-for="(post, index) in posts"
    :key="index"
    cols="12"
    lg="4"
    md="6"
    class="mb-4 col-12 col-md-4"
  >
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
          v-bind:to="{
            path: '/post/' + `${post.id}`,
          }"
          >Read More<font-awesome-icon class="ms-2" icon="arrow-right"
        /></router-link>
      </b-card-body>
    </b-card>

    <!-- :to="'/post/' + post.id" -->
  </b-col>
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
        v-on:click="getPosts"
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
</template>
<script setup>
import { storeToRefs } from "pinia";

import { usePostsStore } from "../../../stores/web/postsStore.js";
const { posts, options, perPage, currentPage, rows } = storeToRefs(usePostsStore());
const { getPosts, setPerPage } = usePostsStore();
</script>
