<template>
  <hr class="p-0 m-0" />
  <!-- Footer -->

  <footer class="text-center text-lg-start bg-white text-dark">
    <div class="container-fluid text-md-start mt-5">
      <!-- Grid row -->
      <div class="row mt-3">
        <!-- Grid column -->
        <div class="col-md-6 col-lg-4 col-xl-4 mx-auto mb-4">
          <!-- Content -->
          <h5 class="text-uppercase mb-4 d-flex" v-if="loading">
          <b-skeleton type="avatar" class="mx-1"></b-skeleton>
        <b-skeleton type="image" style="height:48px;width:135px" class="p-1"></b-skeleton >
          </h5>
          <h5 class="text-uppercase mb-4" v-else>

            <img class="ms-5" :src="logo" alt="" width="50" height="50" />
            <img :src="slogo" alt="" height="60" />
          </h5>
          <p v-if="loading">
            <b-skeleton animation="fade" width="100%"></b-skeleton>
            <b-skeleton animation="fade" width="100%"></b-skeleton>
            <b-skeleton animation="fade" width="90%"></b-skeleton>
          
          </p>

          <p v-if="FooterAbout && !loading">
            {{ FooterAbout }}
          </p>
        </div>

        <!-- Grid column -->
        <div class="col-md-4 col-lg-2 col-xl-2 mx-auto mb-4">
          <!-- Links -->
          <h6 class="text-uppercase fw-bold mb-4">Useful links</h6>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link text-dark" to="/"
                ><font-awesome-icon class="me-2" icon="home" />Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-dark" to="/about"
                ><font-awesome-icon class="me-2" icon="address-card" />About</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-dark" to="/contact"
                ><font-awesome-icon class="me-2" icon="envelope" />Contact</router-link
              >
            </li>
          </ul>
        </div>
        <!-- Grid column -->
        <div
          class="col-md-6 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 d-flex justify-content-center row align-items-center text-center"
        >
          <h6 class="text-uppercase fw-bold mb-4">Opening times</h6>

          <p>Monday: Friday: 10.00 - 23.00</p>
          <p>Saturday: 10.00 - 19.00</p>

          <p>
            <a
            v-for="(social_icon, index) in social_icons" :key="index"
              class="nav-link text-dark me-3 d-inline"
              :to="social_icon.url"
              target="_blank"
            >
              <font-awesome-icon
                :icon="social_icon.icon"
                :class="social_icon.iconclass"
                size="xl"
              />
            </a>
          </p>
        </div>
        <!-- Grid column -->
        <div class="col-md-6 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          <!-- Links -->
          <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
          <p>
            <font-awesome-icon icon="location-dot" class="me-3" />
            123 Main St, Anytown USA 12345
          </p>
          <p>
            <font-awesome-icon icon="envelope" class="me-3" />
            info@example.com
          </p>
          <p><font-awesome-icon icon="phone" class="me-3" /> + 01 234 567 89</p>
        </div>
        <!-- Grid column -->
      </div>
      <!-- Grid row -->
    </div>

    <!-- Copyright -->
    <div class="text-center p-4 bg-white text-dark border-top border-1">
      © 2023 Copyright:
      <a class="text-reset fw-bold" href="#">Al Sufiyan</a>
      Website Proudly Developed & Maintained by MEERANJI TECHNOLOGY, INDIA
    </div>
    <!-- Copyright -->
  </footer>
  <!-- Footer -->
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useSettingStore } from "../../stores/web/settingStore.js";
const { logo, slogo, FooterAbout, social_icons,loading } = storeToRefs(useSettingStore());
</script>
