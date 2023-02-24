<template>
  <Loader v-if="loading" />

  <b-container class="router_view_min py-5" v-else>
    <b-row align-h="center">
      <b-col cols="12" md="8" class="text-center my-5">
        <h1>WHY WE ARE THE BEST</h1>
        <span class="py-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum culpa obcaecati
          necessitatibus dolor quos deleniti dolore quasi, ea eos tempora reprehenderit
          omnis fugiat nesciunt cumque eum, accusamus accusantium sequi! Illum, magnam
          repellendus cumque odio commodi facere rem explicabo alias voluptatum doloribus?
          Ducimus officia ea porro quam consectetur, velit reprehenderit cumque?
        </span>
      </b-col>
    </b-row>
  </b-container>
</template>

<script setup>
import { ref } from "vue";
import Loader from "../common/loader.vue";
const loading = ref(false);
</script>
