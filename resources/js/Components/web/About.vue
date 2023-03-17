<template>
  <Loader v-if="loading" />
  <div class="router_view_min" v-else>
  <Whoweare/>
  <HomeCounter />
  <Team/>
</div>
</template>

<script setup>
import { ref } from "vue";
import Loader from "../common/Loader.vue";
import Whoweare from "./AboutComponents/whoweare.vue";
import Team from "./AboutComponents/team.vue";
import HomeCounter from "./HomeComponents/HomeCounter.vue";
const loading = ref(false);
</script>

