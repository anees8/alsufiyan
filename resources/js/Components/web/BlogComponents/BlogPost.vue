<template>
  <b-container class="py-5 router_view_min">
    <b-row>
      <Loader v-if="loading" class="col-12 col-lg-9 col-md-8" />
      <b-col v-else cols="12" xl="9" lg="8" md="7">
        <b-row>
          <b-col
            v-for="(post, index) in posts"
            :key="index"
            cols="12"
            xl="4"
            lg="6"
            class="mb-4"
          >
            <div>
              <b-card
                :img-src="post.attachment"
                img-top
                img-height="250"
                class="mb-1 w-100"
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
                      icon="fa-regular fa-clock"
                      class="text-muted me-1 fs-6 fw-light"
                    /><span class="fs-6 fw-light">{{
                      dateTime(post.created_at)
                    }}</span></b-col
                  >
                  <!-- <b-col cols="12" class="text-end"
                    ><font-awesome-icon
                      icon="fa-regular fa-comment"
                      class="text-muted me-1"
                    /><span class="fs-6 fw-light">0 Comments</span></b-col
                  > -->
                </b-row>
                <b-card-text
                  style="
                    height: 6.3rem;
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
              </b-card>
            </div>
          </b-col>
        </b-row>
        <b-row align-h="center" class="mt-5">
          <b-col xl="1" lg="2" md="3" class="p-2">
            <b-form-select
              v-if="rows > 5"
              v-model="perPage"
              :options="options"
              size="md"
              v-on:change="setPerPage"
              varient="dark"
            ></b-form-select>
          </b-col>
          <b-col xl="10" lg="10" md="9" class="p-2">
            <b-pagination
              v-if="rows / perPage > 1"
              v-on:click="getPosts"
              v-model="currentPage"
              :total-rows="rows"
              :limit="limit"
              :per-page="perPage"
            ></b-pagination>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" xl="3" lg="4" md="5">
        <b-card>
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
      </b-col>
    </b-row>
  </b-container>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

import Loader from "../../common/loader.vue";

import { usePostsStore } from "../../../stores/web/postsStore.js";
const {
  posts,
  options,
  search,
  limit,
  perPage,
  currentPage,
  rows,
  loading,
} = storeToRefs(usePostsStore());
const { getPosts, dateTime, setPerPage } = usePostsStore();

onMounted(() => {
  getPosts();
});
</script>
