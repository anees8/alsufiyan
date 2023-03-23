<template>
  <b-col
    class="bg-dark vh-100 text-white d-flex align-items-center justify-content-center flex-column"
  >
    <h1>404</h1>
    <div>
      <b-button
        v-if="accessToken"
        :to="{ name: 'Dashboard' }"
        class="me-3"
        variant="light"
        ><font-awesome-icon class="me-2 me-md-1" icon="gauge" />Dashboard</b-button
      >
      <b-button :to="{ name: 'Home' }" variant="light"
        ><font-awesome-icon class="me-2 me-md-1" icon="home" />Home</b-button
      >
    </div>
  </b-col>
</template>
<style scoped></style>
<script setup>
import { storeToRefs } from "pinia";
import { useLoginStore } from "../../stores/admin/loginStore.js";
const { accessToken } = storeToRefs(useLoginStore());
</script>
