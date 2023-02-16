<template>
  <div class="sidebar">
    <Sidebar />

    <div class="content">About</div>
  </div>
</template>
<script setup>
import Sidebar from "../common/Sidebar.vue";
</script>
<style scoped>
.sidebar {
  display: flex;
}

.sidebar .content {
  flex: 1 1 0;
}
</style>
