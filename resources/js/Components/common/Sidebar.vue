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
        <img loading="lazy" :src="settings.logo" width="50" />
        <img
          loading="lazy"
          v-if="!smallMenu"
          :src="settings.slogo"
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
import { useAdminSettingStore } from "../../stores/admin/settingsStore.js";
const { settings, loading } = storeToRefs(useAdminSettingStore());
const { getSettings } = useAdminSettingStore();
getSettings();
let smallMenu = ref(false);

const menuTree = [
  {
    label: "Web",
    icon: "globe",
    name: "Home",
  },
  {
    label: "Dashboard",
    icon: "gauge",
    name: "Dashboard",
    Permissions: "dashboard",
  },
  {
    label: "Home",
    icon: "house",
    Permissions: "home_slider_list,home_package_slider_list,home_counter_list",
    children: [
      {
        label: "Slider",
        icon: "panorama",
        name: "AdminHomeSlider",
        Permissions: "home_slider_list",
      },
      {
        label: "Package",
        icon: "plane-departure",
        name: "AdminHomePackage",
        Permissions: "home_package_slider_list",
      },
      {
        label: "Counter",
        icon: "0",
        name: "AdminHomeCounter",
        Permissions: "home_counter_list",
      },
      {
        label: "Reviews",
        icon: "star-half",
        name: "AdminHomeReview",
        Permissions: "home_review_list",
      },
    ],
  },
  {
    label: "About",
    icon: "address-card",
    name: "AdminAbout",
    Permissions: "users_list",
  },
  {
    label: "Users",
    icon: "users",
    Permissions: "users_list,role_list",
    children: [
      {
        label: "Users List",
        icon: "users",
        name: "AdminUsers",
        Permissions: "users_list",
      },
      {
        label: "Roles & Users",
        icon: "fa-solid fa-user-shield",
        name: "AdminRolesUsers",
        Permissions: "permission_list",
      },
      {
        label: "Roles & Permissions",
        icon: "users-gear",
        name: "AdminRolesPermissions",
        Permissions: "role_list",
      },
      {
        label: "Permissions",
        icon: "fa-solid fa-fingerprint",
        name: "AdminUsersPermissions",
        Permissions: "permission_list",
      },
    ],
  },

  {
    label: "Blog",
    icon: "blog",
    name: "AdminBlog",
    Permissions: "blogs_list",
  },
  {
    label: "Images",
    icon: "image",
    name: "AdminImage",
    Permissions: "images_list",
  },
  {
    label: "Videos",
    icon: "video",
    name: "AdminVideo",
    Permissions: "videos_list",
  },
  {
    label: "Contact",
    icon: "envelopes-bulk",
    Permissions: "contacts_list,contact_subject_list",
    children: [
      {
        label: "Contact",
        icon: "envelopes-bulk",
        name: "AdminContact",
        Permissions: "contacts_list",
      },
      {
        label: "Subject",
        icon: "s",
        name: "AdminContactSubject",
        Permissions: "contact_subject_list",
      },
      {
        label: "Branch",
        icon: "code-branch",
        name: "AdminContactBranch",
        Permissions: "our_branch_list",
      },
    ],
  },
  {
    label: "Settings",
    icon: "gear",
    name: "Setting",
    Permissions: "settings",
  },
  {
    label: "Logout",
    icon: "right-from-bracket",
    name: "Logout",
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
