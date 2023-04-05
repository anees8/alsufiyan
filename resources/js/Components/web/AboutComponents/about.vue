<template>
  <b-container>
    <b-row align-h="center" align-v="stretch">
      <b-col cols="12" md="8" class="text-center mt-5">
        <h1 class="fw-bold">About us</h1>
        <p class="py-2 fw-normal">{{ settings.about }}</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useSettingStore } from "../../../stores/web/settingStore.js";
const { settings } = storeToRefs(useSettingStore());
</script>
