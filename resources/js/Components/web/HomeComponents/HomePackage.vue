<template>
  <b-container class="py-5">
    <div v-if="loading">
      <b-skeleton type="h2" class="fw-bolder mx-auto mb-4" width="30%"></b-skeleton>
      <carousel :autoplay="3000" :wrap-around="true" :breakpoints="breakpoints">
        <slide v-for="pack in 5" :key="pack">
          <div class="card m-1 h-100 w-100">
            <b-skeleton
              type="image"
              animation="fade"
              class="card-img-top"
              style="height: 12.5rem"
            ></b-skeleton>
            <div class="card-body pb-0">
              <h5 class="card-title text-center fw-bold">
                <b-skeleton animation="fade" type="h5"></b-skeleton>
              </h5>
              <hr />
              <div class="d-flex justify-content-between">
                <p class="card-text text-dark w-100 mx-1" style="font-size: 13px">
                  <b-skeleton animation="fade" type="h4"></b-skeleton>
                </p>
                <h6 class="w-100 mx-1">
                  <b-skeleton animation="fade" type="h4"></b-skeleton>
                </h6>
              </div>
              <hr class="pb-2 m-0" />
              <b-skeleton
                animation="fade"
                class="card-text pt-3"
                width="100%"
              ></b-skeleton>
              <b-skeleton
                animation="fade"
                class="card-text pt-3"
                width="95%"
              ></b-skeleton>
              <b-skeleton
                animation="fade"
                class="card-text pt-3"
                width="90%"
              ></b-skeleton>
            </div>
          </div>
        </slide>

        <template #addons="{ slidesCount }">
          <navigation v-if="slidesCount > 1" class="my-4" />
          <pagination />
        </template>
      </carousel>
    </div>
    <div v-else>
      <h3 class="text-center fw-bolder text-dark">
        OUR
        <u>PACKAGES</u>
      </h3>
      <carousel
        :autoplay="3000"
        :wrap-around="true"
        :breakpoints="breakpoints"
        :pauseAutoplayOnHover="true"
      >
        <slide v-for="pack in packages" :key="pack.id">
          <div class="card m-1 h-100 w-100">
            <img
              loading="lazy"
              :src="pack.src"
              class="card-img-top"
              style="height: 12.5rem"
              alt="..."
            />
            <div class="card-body pb-0">
              <h5 class="card-title text-center fw-bold" v-if="pack.title">
                {{ pack.title }}
              </h5>
              <hr />
              <div v-if="pack.price || pack.days" class="d-flex justify-content-between">
                <p class="card-text text-dark" v-if="pack.days" style="font-size: 13px">
                  <span class="text-muted fw-light text-wrap"> Package Duration :</span
                  ><span class="fw-bolder me-1"> ({{ pack.days }})</span>
                  <span class="fw-bolder"> Days</span>
                </p>
                <h6>
                  <span
                    class="text-muted fw-light"
                    style="font-size: 13px"
                    v-if="pack.price"
                    >From:
                  </span>
                  <span class="fw-bolder me-1" v-if="pack.price">
                    {{
                      Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(
                        pack.price
                      )
                    }}</span
                  >
                  <span class="fw-bolder" v-if="pack.price">₹</span>
                </h6>
              </div>
              <hr class="p-0 m-0" v-if="pack.price || pack.days" />

              <p class="card-text pt-3" v-if="pack.description">{{ pack.description }}</p>
            </div>
          </div></slide
        >

        <template #addons="{ slidesCount }">
          <navigation v-if="slidesCount > 1" class="my-4" />
          <pagination />
        </template>
      </carousel>
    </div>
  </b-container>
</template>
<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { storeToRefs } from "pinia";
import { usePackagesStore } from "../../../stores/web/HomeComponents/packagesStore";
const { packages, breakpoints, loading } = storeToRefs(usePackagesStore());
const { getHomePackageSlider } = usePackagesStore();
getHomePackageSlider();
</script>
