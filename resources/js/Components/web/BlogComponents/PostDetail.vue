<template>
  <div class="router_view_min">
    <b-container class="py-5 my-5">
      <b-row>
        <b-col cols="12">
          <b-breadcrumb>
            <b-breadcrumb-item class="nav-link" :to="{ name: 'blog' }">
              <font-awesome-icon class="me-2" icon="blog" />Blog Post</b-breadcrumb-item
            >
            <b-breadcrumb-item active>Blog Detail</b-breadcrumb-item>
          </b-breadcrumb>
        </b-col>
        <b-col class="col-12 col-md-8">
          <router-link
            class="btn btn-outline-dark float-start mb-3"
            @click="$router.go(-1)"
            to=""
            ><font-awesome-icon icon="fa-solid fa-arrow-left" class="me-2" /></router-link
        ></b-col>
        <b-col class="col-12 col-md-8">
          <article>
            <!-- Post header-->
            <header class="mb-4">
              <!-- Post title-->
              <h1 class="fw-bolder mb-1" v-if="post.title">{{ post.title }}</h1>
            </header>
            <!-- Preview image figure-->
            <figure class="mb-4">
              <img class="thumbnail img-fluid rounded" :src="post.attachment" alt="..." />
            </figure>
            <!-- Post content-->
            <section class="mb-5">
              <p>{{ post.content }}</p>
            </section>
          </article>
          <!-- Comments section-->
        </b-col>
        <!-- Side widgets-->
        <!-- <b-col class="col-12 col-md-4"
          ><h1>{{ id }}</h1></b-col
        > -->
      </b-row>
    </b-container>
  </div>
</template>

<script setup>
import { onMounted, defineProps } from "vue";
import { storeToRefs } from "pinia";
import { usePostsStore } from "../../../stores/web/postsStore.js";

const props = defineProps({
  id: Number,
});
const { post } = storeToRefs(usePostsStore());
const { getPost } = usePostsStore();

onMounted(() => {
  getPost(props.id);
});
</script>
