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
    <b-container class="py-5">
      <b-row>
        <BlogPost />
      </b-row>
    </b-container>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import BlogPost from "./BlogComponents/BlogPost.vue";
import { storeToRefs } from "pinia";
import { usePostsStore } from "../../stores/web/postsStore.js";
const { loading } = storeToRefs(usePostsStore());

const { getPosts } = usePostsStore();

onMounted(() => {
  getPosts();
});
</script>
