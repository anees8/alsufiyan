<template>
  <b-container fluid class="py-5">
    <carousel :autoplay="3000" :wrap-around="true" :breakpoints="breakpoints">
      <slide v-for="(pack, index) in packages" :key="pack.id">
        <div class="card m-2 h-100">
          <img :src="pack.src" class="card-img-top" style="height: 15rem" alt="..." />
          <div class="card-body pb-0">
            <h5 class="card-title" v-if="pack.title">{{ pack.title }}</h5>
            <p class="card-text" v-if="pack.desc">{{ pack.desc }}</p>
            <p
              class="card-text text-dark fw-bold"
              v-if="pack.days"
              style="font-size: 13px"
            >
              Package Duration : ({{ pack.days }}) Days
            </p>

            <span v-if="pack.price" class="btn btn-primary" style="font-size: 13px"
              >From ₹
              {{
                Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(
                  pack.price
                )
              }}
              /-
            </span>
          </div>
        </div></slide
      >

      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </b-container>
</template>
<script>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default {
  name: "App",
  data() {
    return {
      packages: [
        {
          id: 1,
          src:
            "https://media.istockphoto.com/id/482206266/photo/kaaba-in-mecca.jpg?s=612x612&w=0&k=20&c=wwzNu3XMQpCRVdAcBbeerUGaew0Fk2nGPQkH98Wj474=",
          title: "HAJJ  PACKAGES",
          desc: "Most Comfortable & satisfied service at very competitive price. ",
          days: "45",
          price: 450000,
        },
        {
          id: 2,
          src:
            "https://media.istockphoto.com/id/1409894360/photo/masjid-e-nabvi-saw.jpg?s=612x612&w=0&k=20&c=_a9WsTQeXJycpc_pOgDt8t_vQHRccRIQ-i1mGwQiqq8=",
          title: "UMRAH PACKAGES",
          desc: "Guidance of Experts & Supervised under Ulama - Ikram.",
          days: "15-20",
          price: 95000,
        },
        {
          id: 3,
          src:
            "https://media.istockphoto.com/id/483447487/photo/view-of-burj-al-arab-hotel-from-the-jumeirah-beach.jpg?s=612x612&w=0&k=20&c=LcOGt0oNvIuJauuOxARnR74dbF7X89pwPrNavFl0rKs=",
          title: "INTERNATIONAL TRAVELS",
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
        1400: {
          itemsToShow: 4,
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
  },
};
</script>
