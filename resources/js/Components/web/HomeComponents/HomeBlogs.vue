<template>
  <b-container class="pt-5">
    <section v-if="loading">
      <b-row>
        <b-col>
          <b-skeleton type="h1" class="fw-bolder mx-auto" width="30%"></b-skeleton>

          <b-skeleton type="button" class="float-end mb-3"></b-skeleton>
        </b-col>
      </b-row>
      <b-row>
        <b-col v-for="post in 3" :key="post" cols="12" xl="4" lg="6" class="mb-4">
          <b-card img-top>
            <b-skeleton
              animation="fade"
              style="height: 250px"
              class="shadow-lg mb-1 w-100"
              card-img="top"
            ></b-skeleton>

            <b-card-title
              style="
                height: 4.5rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              "
            >
              <b-skeleton animation="fade" type="h1" class="my-1"></b-skeleton>
              <b-skeleton animation="fade" type="h1" width="80%"></b-skeleton>
            </b-card-title>

            <b-row class="align-items-center">
              <b-col cols="12" lg="6" md="6" class="d-flex">
                <b-skeleton type="icon" width="20%" class="me-3"></b-skeleton>
                <b-skeleton type="h2" width="70%"></b-skeleton>
              </b-col>
              <b-col cols="12" lg="6" md="6" class="d-flex">
                <b-skeleton type="icon" width="20%" class="me-3"></b-skeleton>
                <b-skeleton type="h2" width="70%"></b-skeleton>
              </b-col>
            </b-row>
            <b-card-text
              style="
                height: 5rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              "
              class="mt-3"
            >
              <b-skeleton animation="fade" width="100%"></b-skeleton>
              <b-skeleton animation="fade" width="95%"></b-skeleton>
              <b-skeleton animation="fade" width="90%"></b-skeleton>
              <b-skeleton animation="fade" width="85%"></b-skeleton>
            </b-card-text>
            <b-skeleton type="button" class="float-end"></b-skeleton>
          </b-card>
        </b-col>
      </b-row>
    </section>
    <section v-else>
      <b-row>
        <b-col>
          <h2 class="fw-bolder text-dark text-center">Blog<u>Posts</u></h2>

          <router-link
            class="btn btn-dark float-end mb-3"
            v-bind:to="{
              name: 'blog',
            }"
            >View All<font-awesome-icon class="ms-2" icon="arrow-right"
          /></router-link>
        </b-col>
      </b-row>
      <b-row
        ><b-col
          v-for="(post, index) in posts"
          :key="index"
          cols="12"
          xl="4"
          lg="6"
          class="mb-4"
          ><b-card
            :img-src="post.attachment"
            img-top
            img-height="250"
            class="shadow-lg mb-1 w-100"
          >
            <router-link
              class="nav-link"
              v-bind:to="{
                path: '/post/' + `${post.id}`,
              }"
            >
              <b-card-title
                style="
                  height: 3.5rem;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                "
              >
                {{ post.title }}
              </b-card-title>
            </router-link>
            <b-row class="align-items-center">
              <b-col cols="12" lg="6" md="6">
                <font-awesome-icon
                  icon="fa-regular fa-user"
                  class="text-muted me-1 fs-6 fw-light"
                />
                <span class="text-muted text-capitalize fs-6 fw-light">
                  {{ post.user.name }}</span
                >
              </b-col>
              <b-col cols="12" lg="6" md="6">
                <font-awesome-icon
                  icon="clock"
                  class="text-muted me-1 fs-6 fw-light"
                /><span class="fs-6 fw-light">{{
                  dateTime(post.created_at)
                }}</span></b-col
              >
            </b-row>
            <b-card-text
              style="
                height: 4.5rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              "
              class="mt-3"
            >
              {{ post.content }}
            </b-card-text>

            <router-link
              class="btn btn-outline-dark float-end"
              v-bind:to="{
                path: '/post/' + `${post.id}`,
              }"
              >Read More<font-awesome-icon class="ms-2" icon="arrow-right"
            /></router-link>
          </b-card> </b-col
      ></b-row>
    </section>
  </b-container>
</template>
<script setup>
import { storeToRefs } from "pinia";

import { usePostStore } from "../../../stores/web/HomeComponents/blogStore.js";
const { posts, loading } = storeToRefs(usePostStore());
const { getPosts, dateTime } = usePostStore();

getPosts();
</script>
