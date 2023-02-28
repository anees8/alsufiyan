<template>
  <Loader v-if="loading" />

  <b-container class="router_view_min py-5" v-else>
    <b-row align-h="center">
      <b-col cols="12" class="text-center my-3">
        <h2 class="fw-normal">About Us</h2>
        <span class="py-2 fs-6 fw-light">
          One of the best Hajj, Umrah & Ziyarat service provided in Mysore, most
          comfortable & satisfied service we provide to all our esteem client's
          surrounding our locations. Guidance of Experts with supervision. It is the
          hearts desire of every muslim to be blessed with an opportunity to visit the
          Kabatullah Shareef with their family and their near and dear ones. One of the
          greatest acts of ibadah among Muslims. Better pilgrimage is our motto for all
          pilgrims. We have been setting up benchmarks in trust and commitments
        </span>
      </b-col>
      <b-col cols="12" class="text-center my-3">
        <h2 class="fw-normal">What makes us different</h2>
        <ul class="text-start fs-6 fw-light py-3">
          <li>Alhamdulillah we are their in services Since 2015.</li>
          <li>
            Providing Accommodation to our Pilgrims within 500 Meters from Mecca (Haram) &
            within 200 Meters from Madina (Masjid-E- Nabavi).
          </li>
          <li>
            Providing Accommodation to our Pilgrims within 500 Meters from Mecca (Haram) &
            within 200 Meters from Madina (Masjid-E- Nabavi).
          </li>
        </ul>
      </b-col>

      <b-col cols="12" class="text-center my-3">
        <h2 class="fw-normal">Ours Exclusive Services</h2>

        <span class="py-2 fs-6 fw-light">
          Since we opened our doors, we have dedicated ourselves to planning trips that
          provide our clients with beautiful memories for years to come. So whatever type
          of trip you’re dreaming of, we’ve got you covered. Get in touch today and we’ll
          take care of the rest. No matter what type of travel plan you’re looking for,
          we’re here to guide you every step of the way. Take a look below to learn more
          about the services we proudly offer, and feel free to get in touch with any
          questions.
        </span>

        <ul class="text-start fs-6 fw-light py-3">
          <li>HAJJ , Umrah Service & Ziyarath.</li>
          <li>Passport Assistance.</li>
          <li>International Tours.</li>
        </ul>
      </b-col>
    </b-row>
  </b-container>
</template>

<script setup>
import { ref } from "vue";
import Loader from "../common/loader.vue";
const loading = ref(false);
</script>
