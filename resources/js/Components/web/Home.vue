<template>
  <div class="router_view_min">
    <HomeContactModal />
    <HomeSliders />
    <HomePackage />
    <HomeCounter />
    <HomeBlogs />
    <HomeGallery />
    <HomeReviews />
  </div>
</template>
<script setup>
import { defineAsyncComponent } from "vue";
const HomeContactModal = defineAsyncComponent(() =>
  import("./HomeComponents/HomeContactModal.vue")
);
const HomeSliders = defineAsyncComponent(() =>
  import("./HomeComponents/HomeSliders.vue")
);
const HomeReviews = defineAsyncComponent(() =>
  import("./HomeComponents/HomeReviews.vue")
);
const HomePackage = defineAsyncComponent(() =>
  import("./HomeComponents/HomePackage.vue")
);
const HomeCounter = defineAsyncComponent(() =>
  import("./HomeComponents/HomeCounter.vue")
);
const HomeBlogs = defineAsyncComponent(() => import("./HomeComponents/HomeBlogs.vue"));
const HomeGallery = defineAsyncComponent(() =>
  import("./HomeComponents/HomeGallery.vue")
);
</script>
