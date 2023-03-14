<template>
  <b-container class="py-5">
    <h2 class="text-center fw-bolder text-dark">
      OUR
      <u>PACKAGES</u>
    </h2>

    <carousel :autoplay="3000" :wrap-around="true" :breakpoints="breakpoints">
      <slide v-for="(pack, index) in packages" :key="pack.id">
        <div class="card m-1 h-100">
          <img :src="pack.src" class="card-img-top" style="height: 12.5rem" alt="..." />
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

            <p class="card-text pt-3" v-if="pack.desc">{{ pack.desc }}</p>
          </div>
        </div></slide
      >

      <template #addons="{ slidesCount }">
        <navigation v-if="slidesCount > 1" class="my-4" />
        <pagination />
      </template>
    </carousel>
  </b-container>
</template>
<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { storeToRefs } from "pinia";
import { usePackagesStore } from "../../../stores/web/HomeComponents/packagesStore";
const { packages, breakpoints } = storeToRefs(usePackagesStore());
</script>
