<template>
  <aside class="bg-light" :class="{ 'small-menu': smallMenu }">
    <div
      @click="smallMenu = !smallMenu"
      class="logo d-flex justify-content-between align-items-center"
    >
      <div class="d-flex">
        <img :src="logo" width="50" />
        <img v-if="!smallMenu" :src="slogo" height="50" />
      </div>
      <div>
        <font-awesome-icon
          class="text-dark ms-1"
          icon="chevron-left"
          :class="{ 'fa-rotate-180 ': smallMenu }"
        />
      </div>
    </div>

    <hr class="m-0" />
    <MenuItem
      v-for="(item, index) in menuTree"
      :key="index"
      :label="item.label"
      :icon="item.icon"
      :name="item.name"
      :depth="0"
      :Permissions="item.Permissions"
      :data="item.children"
      :smallMenu="smallMenu"
    ></MenuItem>
  </aside>
</template>
<script setup>
import MenuItem from "./Menu/MenuItem.vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useSettingStore } from "../../stores/web/settingStore.js";
const { logo, slogo } = storeToRefs(useSettingStore());

let smallMenu = ref(false);

const menuTree = [
  {
    label: "Web",
    icon: "globe",
    name: "Home",
    Permissions: 1,
  },
  {
    label: "Dashboard",
    icon: "gauge",
    name: "Dashboard",
    Permissions: 1,
  },
  {
    label: "Home",
    icon: "house",
    name: "AdminHome",
    Permissions: 1,
  },
  {
    label: "About",
    icon: "address-card",
    name: "AdminAbout",
    Permissions: 1,
  },
  {
    label: "Images",
    icon: "image",
    name: "AdminImage",
    Permissions: 1,
  },
  {
    label: "Videos",
    icon: "video",
    name: "AdminVideo",
    Permissions: 1,
  },

  {
    label: "Logout",
    icon: "right-from-bracket",
    name: "Logout",
    Permissions: 1,
  },
];
</script>
<style lang="scss" scoped>
aside {
  min-height: 100vh;

  width: 16rem;
  transition: all 0.3s ease;

  .logo {
    height: 4rem;
    padding: 1rem;
  }

  &.small-menu {
    transition: all 0.3s ease;
    .logo {
      width: 6rem;
      height: 4rem;
    }
    overflow: inherit;
    width: 6rem;
  }
}
</style>
