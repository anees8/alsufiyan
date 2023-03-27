<template>
  <aside class="bg-light" :class="{ 'small-menu': smallMenu }">
    <div
      @click="smallMenu = !smallMenu"
      class="logo d-flex justify-content-between align-items-center"
    >
      <div class="d-flex" v-if="loading">
        <b-skeleton type="avatar" width="50px"></b-skeleton>
        <b-skeleton
          type="image"
          height="50px"
          width="10rem"
          v-if="!smallMenu"
        ></b-skeleton>
      </div>
      <div class="d-flex" v-else>
        <img loading="lazy" :src="logo" width="50" />
        <img
          loading="lazy"
          v-if="!smallMenu"
          :src="slogo"
          height="50"
          style="max-width: 10rem"
        />
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
import { onMounted } from "vue";
import MenuItem from "./Menu/MenuItem.vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useSettingStore } from "../../stores/web/settingStore.js";
const { logo, slogo, loading } = storeToRefs(useSettingStore());

let smallMenu = ref(false);

const menuTree = [
  {
    label: "Web",
    icon: "globe",
    name: "Home",
    Permissions: "users_view",
  },
  {
    label: "Dashboard",
    icon: "gauge",
    name: "Dashboard",
    Permissions: "users_view",
  },
  {
    label: "Home",
    icon: "house",
    Permissions: "users_view,users_edit",
    children: [
      {
        label: "Slider",
        icon: "house",
        name: "AdminHomeSlider",
        Permissions: "users_view",
      },
      {
        label: "Package",
        icon: "plane-departure",
        name: "AdminHomePackage",
        Permissions: "users_view",
      },
      {
        label: "Counter",
        icon: "0",
        name: "AdminHomeCounter",
        Permissions: "users_view",
      },
    ],
  },
  {
    label: "About",
    icon: "address-card",
    name: "AdminAbout",
    Permissions: "users_view",
  },
  {
    label: "Users",
    icon: "users",
    name: "AdminUsers",
    Permissions: "users_view",
  },
  {
    label: "Blog",
    icon: "blog",
    name: "AdminBlog",
    Permissions: "users_view",
  },
  {
    label: "Images",
    icon: "image",
    name: "AdminImage",
    Permissions: "users_view",
  },
  {
    label: "Videos",
    icon: "video",
    name: "AdminVideo",
    Permissions: "users_view",
  },
  {
    label: "Contact",
    icon: "envelopes-bulk",
    Permissions: "users_view",
    children: [
      {
        label: "Contact",
        icon: "envelopes-bulk",
        name: "AdminContact",
        Permissions: "users_view",
      },
      {
        label: "Subject",
        icon: "s",
        name: "AdminContactSubject",
        Permissions: "users_view",
      },
    ],
  },
  {
    label: "Logout",
    icon: "right-from-bracket",
    name: "Logout",
    Permissions: "users_view",
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
      width: 5rem;
      height: 4rem;
    }
    overflow: inherit;
    width: 5rem;
  }
}
</style>
