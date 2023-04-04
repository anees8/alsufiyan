<template>
  <div class="router_view_min">
    <ContactDetails />
  </div>
</template>
<script setup>
import { defineAsyncComponent } from "vue";

const ContactDetails = defineAsyncComponent(() =>
  import("./ContactComponents/ContactDetails.vue")
);
</script>
