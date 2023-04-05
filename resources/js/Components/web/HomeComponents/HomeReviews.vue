<template>
  <b-container class="py-5" v-if="loading">
    <b-row class="align-items-center">
      <b-col>
        <b-skeleton type="h1" class="fw-bold p-2 mx-auto mb-4" width="30%"></b-skeleton>
        <carousel :autoplay="3000" :wrap-around="true">
          <slide v-for="rewiew in 5" :key="rewiew">
            <b-card class="text-center" style="width: 80%">
              <b-skeleton
                animation="fade"
                type="text"
                class="my-1 mx-auto"
                width="100%"
              ></b-skeleton>
              <b-skeleton
                animation="fade"
                type="text"
                class="my-1 mx-auto"
                width="90%"
              ></b-skeleton>
              <b-skeleton
                animation="fade"
                type="text"
                class="my-1 mx-auto"
                width="60%"
              ></b-skeleton>

              <b-skeleton
                animation="fade"
                type="h1"
                class="mt-5 mb-2 mx-auto"
                width="40%"
              ></b-skeleton>
            </b-card>
          </slide>

          <template #addons="{ slidesCount }">
            <navigation v-if="slidesCount > 1" class="my-4" />
            <pagination />
          </template>
        </carousel>
      </b-col>
    </b-row>
  </b-container>
  <b-container v-else class="py-5">
    <b-row class="align-items-center">
      <b-col>
        <h3 class="fw-bolder text-dark text-center">Clients <u>Review</u></h3>

        <carousel :autoplay="2000" :wrap-around="true" :pauseAutoplayOnHover="true">
          <slide v-for="(review, index) in reviews" :key="index">
            <b-card style="width: 70%">
              <figure class="text-center">
                <blockquote class="blockquote">
                  <p class="fs-5">
                    <q>{{ review.comment }}</q>
                  </p>
                </blockquote>
                <figcaption class="blockquote-footer">
                  Review by <cite title="Source Title">{{ review.user }}</cite>
                </figcaption>
              </figure>
            </b-card>
          </slide>

          <template #addons>
            <navigation />
            <pagination />
          </template>
        </carousel>
      </b-col>
    </b-row>
    <b-row class="align-items-center text-center mt-3"
      ><b-col>
        <b-link class="btn btn-dark" href="#">More Reviews</b-link>
      </b-col></b-row
    >
  </b-container>
</template>
<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { storeToRefs } from "pinia";
import { useReviewsStore } from "../../../stores/web/HomeComponents/reviewStore.js";
const { reviews, loading } = storeToRefs(useReviewsStore());
</script>
