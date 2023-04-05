<template>
  <Loader v-if="loading" />
  <div class="router_view_min" v-else>
    <About />
    <Branch />
    <HomeCounter />
    <HomeReviews />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { defineAsyncComponent } from "vue";

const Loader = defineAsyncComponent(() => import("../common/Loader.vue"));
const About = defineAsyncComponent(() => import("./AboutComponents/about.vue"));
const Branch = defineAsyncComponent(() => import("./AboutComponents/branch.vue"));

const HomeCounter = defineAsyncComponent(() =>
  import("./HomeComponents/HomeCounter.vue")
);
const HomeReviews = defineAsyncComponent(() =>
  import("./HomeComponents/HomeReviews.vue")
);
const loading = ref(false);
</script>
