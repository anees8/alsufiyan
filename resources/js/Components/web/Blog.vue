<template>
  <BlogPost />
</template>
<script setup>
import { defineAsyncComponent } from "vue";

const BlogPost = defineAsyncComponent(() => import("./BlogComponents/BlogPost.vue"));
</script>
