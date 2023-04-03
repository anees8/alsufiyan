<template>
  <div class="container-fluid">
    <div class="row align-items-center justify-content-center vh-100">
      <div class="col-12 col-md-3 p-5">
        <div class="text-center">
          <div class="d-flex mb-4 mt-2 align-items-center justify-content-center">
            <img loading="lazy" :src="settings.logo" width="50" />
            <img
              loading="lazy"
              v-if="!smallMenu"
              :src="settings.slogo"
              height="50"
              style="max-width: 10rem"
            />
          </div>

          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useLoginStore } from "@/stores/admin/loginStore.js";
import { useSettingStore } from "../../stores/web/settingStore.js";

const { removeToken } = useLoginStore();
const { settings } = storeToRefs(useSettingStore());
const { getSettings } = useSettingStore();

getSettings();
onMounted(() => {
  setTimeout(function () {
    removeToken();
  }, 500);
});
</script>
