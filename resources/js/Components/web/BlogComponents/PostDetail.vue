<template>
  <b-container class="py-5 router_view_min">
    <b-row>
      <b-col cols="12">
        <b-row>
          <b-col>
            <router-link
              class="btn btn-outline-dark float-start mb-3"
              @click="$router.go(-1)"
              to=""
              ><font-awesome-icon icon="fa-solid fa-arrow-left" class="me-2"
            /></router-link>
          </b-col>
          <b-col>
            <b-breadcrumb>
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
      </b-col>
      <Loader v-if="loading" class="col-12 col-lg-9 col-md-8" />
      <b-col v-else cols="12" xl="9" lg="8" md="7">
        <b-row>
          <b-col class="col-12">
            <article>
              <!-- Post header-->
              <header class="mb-4">
                <!-- Post title-->
                <h1 class="fw-bolder mb-1" v-if="post.title">{{ post.title }}</h1>
              </header>
              <!-- Preview image figure-->
              <figure class="mb-4">
                <img
                  class="thumbnail img-fluid rounded"
                  :src="post.attachment"
                  alt="..."
                />
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
        </b-row></b-col
      >

      <b-col cols="12" xl="3" lg="4" md="5">
        <b-card>
          <h4 class="sidebar-title">Search</h4>
          <b-form class="mt-3">
            <b-input-group label="Small">
              <b-input-group-append>
                <b-button> <font-awesome-icon icon="magnifying-glass" /></b-button>
              </b-input-group-append>

              <b-form-input
                v-model="search"
                class="outline-0"
                type="search"
                placeholder="Search..."
                @input="getPosts"
              ></b-form-input>
            </b-input-group>
          </b-form>
        </b-card>
      </b-col> </b-row
  ></b-container>
</template>

<script setup>
import { onMounted, defineProps } from "vue";
import Loader from "../../common/loader.vue";
import { storeToRefs } from "pinia";
import { usePostsStore } from "../../../stores/web/postsStore.js";

const props = defineProps({
  id: Number,
});
const { post, loading } = storeToRefs(usePostsStore());
const { getPost } = usePostsStore();

onMounted(() => {
  getPost(props.id);
});
</script>
