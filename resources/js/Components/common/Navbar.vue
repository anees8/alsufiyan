<template>
  <!-- <b-navbar toggleable="lg" type="light" variant="white" fixed="top" class="p-0 m-0">
    <b-navbar-brand href="#">
      <img class="mx-1" :src="logo" height="48" /> <img :src="slogo" height="48"
    /></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item class="px-xl-3 px-md-2 py-2" :to="{ name: 'Home' }"
          ><font-awesome-icon class="me-2" icon="home" />Home</b-nav-item
        >
        <b-nav-item class="px-xl-3 px-md-2 py-2" :to="{ name: 'About' }"
          ><font-awesome-icon class="me-2" icon="address-card" />About</b-nav-item
        >
        <b-nav-item class="px-xl-3 px-md-2 py-2" :to="{ name: 'blog' }"
          ><font-awesome-icon class="me-2" icon="blog" />Blog</b-nav-item
        >
        <b-nav-item class="px-xl-3 px-md-2 py-2" :to="{ name: 'gallery' }"
          ><font-awesome-icon class="me-2" icon="image" />Gallery</b-nav-item
        >
        <b-nav-item class="px-xl-3 px-md-2 py-2" :to="{ name: 'Videos' }"
          ><font-awesome-icon class="me-2" icon="video" />Videos</b-nav-item
        >
        <b-nav-item class="px-xl-3 px-md-2 py-2" :to="{ name: 'contact' }"
          ><font-awesome-icon class="me-2" icon="envelope" />Contact</b-nav-item
        >
        <b-nav-item class="px-xl-3 px-md-2 py-2" :to="{ name: 'Login' }"
          >Login<font-awesome-icon class="ms-2" icon="arrow-right"
        /></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar> -->
  <nav
    class="navbar navbar-expand-lg fixed-top navbar-light bg-white justify-content-between p-0 m-0"
  >
    <div class="container-fluid text-center">
      <a class="navbar-brand" href="#">
        <img class="mx-1" :src="logo" height="48" />
        <img :src="slogo" height="48" />
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
          class="navbar-nav m-auto me-xl-5 me-md-2 mb-0 flex items-center justify-between text-center"
        >
          <li class="nav-item mx-0">
            <RouterLink
              class="nav-link px-xl-4 px-md-3 py-3 text-dark"
              exact
              active-class="active  border-bottom border-1   shadow-sm  border-dark  bg-light "
              :to="{ name: 'Home' }"
              ><font-awesome-icon class="me-2" icon="home" />Home</RouterLink
            >
          </li>
          <li class="nav-item mx-0">
            <RouterLink
              class="nav-link px-xl-4 px-md-3 py-3 text-dark"
              exact
              active-class="active  border-bottom border-1   shadow-sm  border-dark  bg-light "
              :to="{ name: 'About' }"
              ><font-awesome-icon class="me-2" icon="address-card" />About</RouterLink
            >
          </li>
          <li class="nav-item mx-0">
            <RouterLink
              class="nav-link px-xl-4 px-md-3 py-3 text-dark"
              exact
              active-class="active  border-bottom border-1   shadow-sm  border-dark  bg-light "
              :to="{ name: 'blog' }"
              ><font-awesome-icon class="me-2" icon="blog" />Blog</RouterLink
            >
          </li>
          <li class="nav-item mx-0">
            <RouterLink
              class="nav-link px-xl-4 px-md-3 py-3 text-dark"
              exact
              active-class="active  border-bottom border-1   shadow-sm  border-dark  bg-light "
              :to="{ name: 'gallery' }"
              ><font-awesome-icon class="me-2" icon="image" />Gallery</RouterLink
            >
          </li>
          <li class="nav-item mx-0">
            <RouterLink
              class="nav-link px-xl-4 px-md-3 py-3 text-dark"
              exact
              active-class="active  border-bottom border-1   shadow-sm  border-dark  bg-light "
              :to="{ name: 'Videos' }"
              ><font-awesome-icon class="me-2" icon="video" />Videos</RouterLink
            >
          </li>
          <li class="nav-item mx-0">
            <RouterLink
              class="nav-link px-xl-4 px-md-3 py-3 text-dark"
              exact
              active-class="active  border-bottom border-1   shadow-sm  border-dark bg-light "
              :to="{ name: 'contact' }"
              ><font-awesome-icon class="me-2" icon="envelope" />Contact</RouterLink
            >
          </li>

          <li class="nav-item mx-0">
            <RouterLink
              class="nav-link px-xl-4 px-md-3 py-3 text-dark"
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
