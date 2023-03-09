<template>
  <b-container class="py-5">
    <h2 class="text-center fw-bolder text-dark">
      OUR
      <u>PACKAGES</u>
    </h2>

    <carousel :autoplay="5000" :wrap-around="true" :breakpoints="breakpoints">
      <slide v-for="(pack, index) in packages" :key="pack.id">
        <div class="card shadow-lg m-1 h-100">
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
          <b-col class="my-2">
            <!-- <RouterLink class="btn btn-secondary float-start ms-4 mb-2" to=""
              >Details<font-awesome-icon class="ms-2" icon="arrow-right"
            /></RouterLink> -->
          </b-col>
        </div></slide
      >

      <template #addons="{ slidesCount }">
        <navigation v-if="slidesCount > 1" class="my-4" />
        <pagination />
      </template>
    </carousel>
  </b-container>
</template>
<script>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { RouterLink } from "vue-router";

export default {
  name: "App",
  data() {
    return {
      packages: [
        {
          id: 1,
          src:
            "https://media.istockphoto.com/id/482206266/photo/kaaba-in-mecca.jpg?s=612x612&w=0&k=20&c=wwzNu3XMQpCRVdAcBbeerUGaew0Fk2nGPQkH98Wj474=",
          title: "HAJJ",
          desc: "Most Comfortable & satisfied service at very competitive price. ",
          days: "45",
          price: 450000,
        },
        {
          id: 2,
          src:
            "https://media.istockphoto.com/id/1409894360/photo/masjid-e-nabvi-saw.jpg?s=612x612&w=0&k=20&c=_a9WsTQeXJycpc_pOgDt8t_vQHRccRIQ-i1mGwQiqq8=",
          title: "UMRAH",
          desc: "Guidance of Experts & Supervised under Ulama - Ikram.",
          days: "15-20",
          price: 95000,
        },
        {
          id: 3,
          src:
            "https://media.istockphoto.com/id/483447487/photo/view-of-burj-al-arab-hotel-from-the-jumeirah-beach.jpg?s=612x612&w=0&k=20&c=LcOGt0oNvIuJauuOxARnR74dbF7X89pwPrNavFl0rKs=",
          title: "INTERNATIONAL TRAVELS",
          days: "15-20",
          desc: "Our Travel Forum is truly unique, made to satisfy every client",
        },
        {
          id: 4,
          src:
            "https://media.istockphoto.com/id/1129005214/photo/woman-at-the-airport.jpg?s=612x612&w=0&k=20&c=fCR5s7vuVwxvt8NCq2zzR9u08P_HBKguQ0lpjYrk370=",
          title: "PASSPORT ASSISTANCE",
          desc: "We have experienced and dedicated Passport Consultants.",
        },
        {
          id: 5,
          src:
            "https://media.istockphoto.com/id/1140828971/photo/different-world-directions-signpost.jpg?s=612x612&w=0&k=20&c=SV_SrRCtdpVCUfZFhNZQhuanyF89IGr5_dqwEf_gdKo=",
          title: "TRAVEL CONSULTANT",
          desc:
            "We will help you spend your quality time with your loved ones in entire journey",
        },
        {
          id: 6,
          src:
            "https://media.istockphoto.com/id/1140618593/photo/aerial-view-of-sao-paulo-brazil-at-night.jpg?s=612x612&w=0&k=20&c=io-JGlcUbN7RhU3plNpYg6lFaJC-G31dT6wepqzocB8=",
          title: "CORPORATE TOURS",
          desc: "We will arrange corporate tours for your employees.",
        },
      ],

      breakpoints: {
        // 700px and up
        480: {
          itemsToShow: 1,
          snapAlign: "start",
        },
        // 1024 and up
        768: {
          itemsToShow: 2,
          snapAlign: "start",
        },
        1024: {
          itemsToShow: 3,
          snapAlign: "start",
        },
      },
    };
  },
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
    RouterLink,
  },
};
</script>
