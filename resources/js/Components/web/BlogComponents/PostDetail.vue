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
     
      <b-col v-if="loading" cols="12" xl="9" lg="8" md="7">
        <b-row>
          <b-col class="col-12">
            <b-card>
             
                <b-skeleton animation="fade" type="image"   style="height: 40rem" class="thumbnail img-fluid rounded w-100 mb-4" card-img="top"></b-skeleton>
               

                <header class="mb-4">
                  <!-- Post title-->
                  <b-skeleton animation="fade" type="h2" class="mb-1"></b-skeleton>
                  <b-skeleton animation="fade" type="h2"  class="mb-1"></b-skeleton>
                  <b-skeleton animation="fade" type="h2"  class="mb-1"></b-skeleton>
                  <b-skeleton animation="fade" type="h2" class="mb-1" ></b-skeleton>
                  <b-skeleton animation="fade" type="h2"  class="mb-1"></b-skeleton>
                  <b-skeleton animation="fade" type="h2" class="mb-1" ></b-skeleton>
                  <b-skeleton animation="fade" type="h2"  class="mb-1"></b-skeleton>


              
                </header>
                <section class="my-2 d-flex">
                  <b-skeleton animation="fade" type="icon"  class="me-2" width="10%"></b-skeleton>
                  <b-skeleton animation="fade" type="h2"  class="me-2" width="60%"></b-skeleton>
                  <b-skeleton animation="fade" type="icon"  class="me-2" width="10%"></b-skeleton>
                  <b-skeleton animation="fade" type="h2"  class="me-2" width="60%"></b-skeleton>
              
                </section>
                <!-- Post content-->
                <section class="mb-5">
                  <b-skeleton width="100%"></b-skeleton>
                  <b-skeleton width="95%"></b-skeleton>
                  <b-skeleton width="95%"></b-skeleton>
                  <b-skeleton width="100%"></b-skeleton>
                  <b-skeleton width="95%"></b-skeleton>
                  <b-skeleton width="90%"></b-skeleton>
                  <b-skeleton width="100%"></b-skeleton>
                  <b-skeleton width="95%"></b-skeleton>
                  <b-skeleton width="90%"></b-skeleton>
                  <b-skeleton width="100%"></b-skeleton>
                  <b-skeleton width="95%"></b-skeleton>
                  <b-skeleton width="90%"></b-skeleton>
                  <b-skeleton width="100%"></b-skeleton>   
               
                </section>
            
            </b-card>
            <!-- Comments section-->
          </b-col>
          <!-- Side widgets-->
          <!-- <b-col class="col-12 col-md-4"
          ><h1>{{ id }}</h1></b-col
        > -->
        </b-row>
        </b-col
      >
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
                    icon="clock"
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
        </b-row>
        </b-col
      >

      <b-col cols="12" xl="3" lg="4" md="5">
        <b-card> </b-card>
      </b-col> </b-row
  ></b-container>
</template>

<script setup>
import { defineProps } from "vue";
import { storeToRefs } from "pinia";
import { usePostsStore } from "../../../stores/web/postsStore.js";

const props = defineProps({
  id: Number,
});
const { post, loading } = storeToRefs(usePostsStore());
const { getPost, dateTime } = usePostsStore();

getPost(props.id);
</script>
