<template>
  <div class="container">
    <div class="row align-items-center justify-content-center vh-100">
      <div class="col-12 col-md-4 p-5">
        <div class="text-center">
          <button class="btn btn-dark rounded-circle p-2">
            <font-awesome-icon class="fa-pulse" icon="spinner" size="3x" />
          </button>

          <h4><b-skeleton-icon>Logouting....</b-skeleton-icon></h4>

          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useLoginStore } from "@/stores/admin/loginStore.js";

const { removeToken } = useLoginStore();

onMounted(() => {
  setTimeout(function () {
    removeToken();
  }, 500);
});
</script>
