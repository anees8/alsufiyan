<template>
  <b-container class="bg-dark text-center text-uppercase" fluid>
    <b-container class="py-5">
      <h2 class="text-center fw-bolder text-light">
        <u></u>
      </h2>
      <b-row
        ><b-col cols="12" class="col-md-3"
          ><b-card class="shadow-lg">
            <number
              :from="0"
              :to="inquiry"
              :duration="5"
              class="h1"
              easing="Power1.easeOut"
            />

            <hr class="mx-5" />
            <h5>Inquiry</h5>
          </b-card> </b-col
        ><b-col cols="12" class="col-md-3"
          ><b-card class="shadow-lg">
            <number
              :from="0"
              :to="satisfy"
              :duration="5"
              class="h1"
              easing="Power1.easeOut"
            />
            <hr class="mx-5" />
            <h5>satisfied customer</h5>
          </b-card></b-col
        ><b-col cols="12" class="col-md-3"
          ><b-card class="shadow-lg">
            <number
              :from="0"
              :to="team"
              :duration="5"
              class="h1"
              easing="Power1.easeOut"
            />
            <hr class="mx-5" />
            <h5>our team</h5>
          </b-card></b-col
        ><b-col cols="12" class="col-md-3"
          ><b-card class="shadow-lg">
            <number
              :from="0"
              :to="serviceYear"
              :duration="5"
              class="h1"
              easing="Power1.easeOut"
            />
            <hr class="mx-5" />
            <h5>years of service</h5>
          </b-card></b-col
        ></b-row
      ></b-container
    >
  </b-container>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCountersStore } from "../../../stores/web/HomeComponents/counterStore";
const { inquiry, satisfy, team, serviceYear } = storeToRefs(useCountersStore());
const { getExperiance } = useCountersStore();
getExperiance();
</script>
