<template>
  <nav
    class="navbar navbar-expand-lg fixed-top navbar-light bg-white justify-content-between p-0 border"
  >
    <div class="container-fluid text-center">
      <a class="navbar-brand" href="#">
        <img class="mx-1" :src="logo" alt="" width="50" height="50" />
        <img :src="slogo" alt="" height="50" />
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul
          class="navbar-nav m-auto me-md-5 mb-0 flex items-center justify-between text-center"
        >
          <li class="nav-item mx-0">
            <RouterLink
              class="nav-link px-3 py-3 text-dark"
              exact
              active-class="active  border-bottom border-1   shadow-sm  border-dark  bg-light "
              :to="{ name: 'Home' }"
              ><font-awesome-icon class="me-2" icon="home" />Home</RouterLink
            >
          </li>
          <li class="nav-item mx-0">
            <RouterLink
              class="nav-link px-3 py-3 text-dark"
              exact
              active-class="active  border-bottom border-1   shadow-sm  border-dark  bg-light "
              :to="{ name: 'About' }"
              ><font-awesome-icon class="me-2" icon="address-card" />About</RouterLink
            >
          </li>
          <li class="nav-item mx-0">
            <RouterLink
              class="nav-link px-3 py-3 text-dark"
              exact
              active-class="active  border-bottom border-1   shadow-sm  border-dark  bg-light "
              :to="{ name: 'blog' }"
              ><font-awesome-icon class="me-2" icon="blog" />Blog Post</RouterLink
            >
          </li>
          <li class="nav-item mx-0">
            <RouterLink
              class="nav-link px-3 py-3 text-dark"
              exact
              active-class="active  border-bottom border-1   shadow-sm  border-dark  bg-light "
              :to="{ name: 'gallery' }"
              ><font-awesome-icon class="me-2" icon="image" />Gallery</RouterLink
            >
          </li>
          <li class="nav-item mx-0">
            <RouterLink
              class="nav-link px-3 py-3 text-dark"
              exact
              active-class="active  border-bottom border-1   shadow-sm  border-dark bg-light "
              :to="{ name: 'contact' }"
              ><font-awesome-icon class="me-2" icon="envelope" />Contact</RouterLink
            >
          </li>

          <li class="nav-item mx-0">
            <RouterLink
              class="nav-link px-3 py-3 text-dark"
              exact
              active-class="active  border-bottom border-1  shadow-sm border-dark bg-light"
              :to="{ name: 'Login' }"
              >Login<font-awesome-icon class="ms-2" icon="arrow-right"
            /></RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style scoped>
.navbar {
  font-weight: 500;
}
</style>
<script setup>
import { storeToRefs } from "pinia";
import { useSettingStore } from "../../stores/web/settingStore.js";
const { logo, slogo } = storeToRefs(useSettingStore());
</script>
