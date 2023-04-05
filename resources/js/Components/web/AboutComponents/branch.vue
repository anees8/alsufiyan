<template>
  <b-container>
    <b-row class="py-5 align-items-center">
      <h1 class="fw-bold text-center">Our Branch</h1>
      <b-col
        cols="12"
        md="6"
        lg="3"
        class="my-2"
        v-for="(branch, index) in branches"
        :key="index"
      >
        <b-card
          :title="branch.location"
          :img-src="branch.image"
          img-alt="Image"
          img-top
          style="max-width: 20rem"
          class="mb-2"
        >
          <div class="py-2">
            <font-awesome-icon icon="fa-regular fa-user" class="me-3" />{{
              branch.person
            }}
          </div>
          <div class="py-2">
            <font-awesome-icon icon="mobile-screen" class="me-3" />{{ branch.phone }}
          </div>

          <div class="py-2">
            <a :href="branch.map" class="nav-link text-success" target="_blank">
              <font-awesome-icon icon="location-dot" class="me-3" />
              {{ branch.address }}</a
            >
          </div></b-card
        ></b-col
      >
    </b-row>
  </b-container>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useAboutStore } from "../../../stores/web/aboutStore.js";
const { branches } = storeToRefs(useAboutStore());
const { getBraches } = useAboutStore();

getBraches();
</script>
