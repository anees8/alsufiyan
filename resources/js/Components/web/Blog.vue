<template>
  <Loader v-if="loading" />
  <div v-else class="router_view_min">
    <b-container class="py-5">
      <BlogPost />
    </b-container>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import BlogPost from "./BlogComponents/BlogPost.vue";
import { storeToRefs } from "pinia";
import Loader from "../common/loader.vue";
import { usePostsStore } from "../../stores/web/postsStore.js";
const { loading } = storeToRefs(usePostsStore());

const { getPosts } = usePostsStore();

onMounted(() => {
  getPosts();
});
</script>
