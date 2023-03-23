<template>
  <nav
    class="navbar navbar-expand-lg fixed-top navbar-light bg-white justify-content-between p-0 m-0"
  >
    <div class="container text-center">
      <a class="navbar-brand d-flex" v-if="loading">
        <b-skeleton type="avatar" class="mx-1"></b-skeleton>
        <b-skeleton
          type="image"
          style="height: 48px; width: 135px"
          class="p-1"
        ></b-skeleton>
      </a>

      <a v-else class="navbar-brand" href="#">
        <img class="mx-1" :src="logo" height="48" />
        <img :src="slogo" height="48" style="max-width: 135px" class="p-1" />
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
          class="navbar-nav m-auto me-xl-5 me-md-1 mb-0 flex items-center justify-between text-center"
        >
          <li class="nav-item mx-0">
            <RouterLink
              class="nav-link px-xl-4 px-md-3 py-3 text-dark"
              exact
              active-class="active  border-bottom border-1   shadow-sm  border-dark  bg-light "
              :to="{ name: 'Home' }"
              ><font-awesome-icon class="me-2 me-md-1" icon="home" />Home</RouterLink
            >
          </li>
          <li class="nav-item mx-0">
            <RouterLink
              class="nav-link px-xl-4 px-md-3 py-3 text-dark"
              exact
              active-class="active  border-bottom border-1   shadow-sm  border-dark  bg-light "
              :to="{ name: 'About' }"
              ><font-awesome-icon
                class="me-2 me-md-1"
                icon="address-card"
              />About</RouterLink
            >
          </li>
          <li class="nav-item mx-0">
            <RouterLink
              class="nav-link px-xl-4 px-md-3 py-3 text-dark"
              exact
              active-class="active  border-bottom border-1   shadow-sm  border-dark  bg-light "
              :to="{ name: 'blog' }"
              ><font-awesome-icon class="me-2 me-md-1" icon="blog" />Blog</RouterLink
            >
          </li>
          <li class="nav-item mx-0">
            <RouterLink
              class="nav-link px-xl-4 px-md-3 py-3 text-dark"
              exact
              active-class="active  border-bottom border-1   shadow-sm  border-dark  bg-light "
              :to="{ name: 'gallery' }"
              ><font-awesome-icon class="me-2 me-md-1" icon="image" />Gallery</RouterLink
            >
          </li>
          <li class="nav-item mx-0">
            <RouterLink
              class="nav-link px-xl-4 px-md-3 py-3 text-dark"
              exact
              active-class="active  border-bottom border-1   shadow-sm  border-dark  bg-light "
              :to="{ name: 'Videos' }"
              ><font-awesome-icon class="me-2 me-md-1" icon="video" />Videos</RouterLink
            >
          </li>
          <li class="nav-item mx-0">
            <RouterLink
              class="nav-link px-xl-4 px-md-3 py-3 text-dark"
              exact
              active-class="active  border-bottom border-1   shadow-sm  border-dark bg-light "
              :to="{ name: 'contact' }"
              ><font-awesome-icon
                class="me-2 me-md-1"
                icon="envelope"
              />Contact</RouterLink
            >
          </li>

          <li class="nav-item mx-0" v-if="loginUser">
            <RouterLink
              class="nav-link text-dark"
              exact
              active-class="active  border-bottom border-1  shadow-sm border-dark bg-light"
              :to="{ name: 'Login' }"
            >
              <button class="btn btn-dark rounded p-2">
                {{ loginUser.charAt(0) }}
                <font-awesome-icon class="me-2 me-md-1" icon="gauge" />
                <!-- {{
                  loginUser
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                }} -->
              </button>
            </RouterLink>
          </li>
          <li class="nav-item mx-0" v-else>
            <RouterLink
              class="nav-link px-xl-4 px-md-3 py-3 text-dark"
              exact
              active-class="active  border-bottom border-1  shadow-sm border-dark bg-light"
              :to="{ name: 'Login' }"
              >Login<font-awesome-icon class="ms-2 ms-md-1" icon="arrow-right"
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
import { useLoginStore } from "../../stores/admin/loginStore.js";
const { logo, slogo, loading } = storeToRefs(useSettingStore());
const { loginUser } = storeToRefs(useLoginStore());
</script>
