<template>
  <b-container class="router_view_min py-4">
    <b-row>
      <b-col cols="12" class="d-flex">
        <router-link class="nav-link" @click="$router.go(-1)" to=""
          ><font-awesome-icon icon="fa-solid fa-arrow-left" class="me-2"
        /></router-link>

        <b-breadcrumb class="ms-2">
          <b-breadcrumb-item class="nav-link" :to="{ name: 'Home' }">
            Home</b-breadcrumb-item
          >
          <b-breadcrumb-item class="nav-link" :to="{ name: 'blog' }">
            Blog Post</b-breadcrumb-item
          >
          <b-breadcrumb-item active>Blog Detail</b-breadcrumb-item>
        </b-breadcrumb>
      </b-col>
    </b-row>

    <b-row>
      <Loader v-if="loading" class="col-12 col-lg-9 col-md-8" />
      <b-col v-else cols="12" xl="9" lg="8" md="7">
        <b-row>
          <b-col class="col-12">
            <b-card>
              <article>
                <!-- Post header-->

                <!-- Preview image figure-->
                <figure class="mb-4">
                  <img
                    class="thumbnail img-fluid rounded w-100"
                    :src="post.attachment"
                    style="height: 40rem"
                    alt="..."
                  />
                </figure>

                <header class="mb-4">
                  <!-- Post title-->
                  <h2 class="fw-bold mb-1" v-if="post.title">{{ post.title }}</h2>
                </header>
                <section class="my-2">
                  <font-awesome-icon
                    icon="fa-regular fa-user"
                    class="text-muted me-1 fs-6 fw-light me-2"
                  />
                  <span class="text-muted text-capitalize fs-6 fw-light me-2">
                    {{ post.user ? post.user.name : "" }}
                  </span>

                  <font-awesome-icon
                    icon="fa-regular fa-clock"
                    class="text-muted me-1 fs-6 fw-light me-2"
                  /><span class="fs-6 fw-light me-2">{{
                    dateTime(post.created_at)
                  }}</span>
                </section>
                <!-- Post content-->
                <section class="mb-5">
                  <p>{{ post.content }}</p>
                </section>
              </article>
            </b-card>
            <!-- Comments section-->
          </b-col>
          <!-- Side widgets-->
          <!-- <b-col class="col-12 col-md-4"
          ><h1>{{ id }}</h1></b-col
        > -->
        </b-row></b-col
      >

      <b-col cols="12" xl="3" lg="4" md="5">
        <b-card> </b-card>
      </b-col> </b-row
  ></b-container>
</template>

<script setup>
import { defineProps } from "vue";
import Loader from "../../common/loader.vue";
import { storeToRefs } from "pinia";
import { usePostsStore } from "../../../stores/web/postsStore.js";

const props = defineProps({
  id: Number,
});
const { post, loading } = storeToRefs(usePostsStore());
const { getPost, dateTime } = usePostsStore();

getPost(props.id);
</script>
