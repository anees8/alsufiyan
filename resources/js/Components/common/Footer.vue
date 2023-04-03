<template>
  <hr class="p-0 m-0" />
  <!-- Footer -->

  <footer class="text-center text-lg-start bg-white text-dark">
    <div class="container text-md-start mt-5">
      <!-- Grid row -->
      <div class="row mt-3">
        <!-- Grid column -->
        <div class="col-md-6 col-lg-4 col-xl-4 mb-4">
          <!-- Content -->
          <h5 class="text-uppercase mb-4 d-flex" v-if="loading">
            <b-skeleton type="avatar" class="mx-1"></b-skeleton>
            <b-skeleton
              type="image"
              style="height: 48px; width: 135px"
              class="p-1"
            ></b-skeleton>
          </h5>
          <h5 class="text-uppercase mb-4" v-else>
            <img
              loading="lazy"
              class="ms-xl-5"
              :src="settings.logo"
              alt=""
              width="50"
              height="50"
            />
            <img loading="lazy" :src="settings.slogo" alt="" height="60" />
          </h5>
          <p v-if="loading">
            <b-skeleton animation="fade" width="100%"></b-skeleton>
            <b-skeleton animation="fade" width="100%"></b-skeleton>
            <b-skeleton animation="fade" width="90%"></b-skeleton>
          </p>

          <p v-if="settings.footer && !loading">
            {{ settings.footer }}
          </p>
        </div>

        <!-- Grid column -->
        <div class="col-md-6 col-lg-4 col-xl-4 text-center">
          <h6 class="text-uppercase fw-bold mb-5">Opening times</h6>

          <div v-html="settings.openingTime"></div>
          <p>
            <a
              v-if="settings.facebook"
              class="nav-link text-dark me-3 d-inline"
              :href="settings.facebook"
              target="_blank"
            >
              <font-awesome-icon
                icon="fa-brands fa-facebook-f"
                class="text-primary"
                size="xl"
              />
            </a>
            <a
              v-if="settings.whatsapp"
              class="nav-link text-dark me-3 d-inline"
              :href="settings.whatsapp"
              target="_blank"
            >
              <font-awesome-icon
                icon="fa-brands fa-whatsapp"
                class="text-success"
                size="xl"
              />
            </a>
            <a
              v-if="settings.youtube"
              class="nav-link text-dark me-3 d-inline"
              :href="settings.youtube"
              target="_blank"
            >
              <font-awesome-icon
                icon="fa-brands fa-youtube"
                class="text-danger"
                size="xl"
              />
            </a>
          </p>
        </div>
        <!-- Grid column -->
        <div class="col-md-6 col-lg-4 col-xl-4 mx-auto mb-md-0 mb-4">
          <!-- Links -->
          <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
          <p v-if="settings.CompanyAdress">
            <font-awesome-icon icon="location-dot" class="me-3" />
            {{ settings.CompanyAdress }}
          </p>
          <p v-if="settings.email">
            <font-awesome-icon icon="envelope" class="me-3" />
            {{ settings.email }}
          </p>
          <p v-if="settings.CompanyPhone">
            <font-awesome-icon icon="mobile-screen" class="me-3" />
            {{ settings.CompanyPhone }}
          </p>
          <p v-if="settings.CompanyAlternatePhone">
            <font-awesome-icon icon="mobile-screen" class="me-3" />
            {{ settings.CompanyAlternatePhone }}
          </p>
        </div>
        <!-- Grid column -->
      </div>
      <!-- Grid row -->
    </div>

    <!-- Copyright -->
    <div class="text-center p-4 bg-white text-dark border-top border-1">
      <div v-html="settings.copyright"></div>
    </div>
    <!-- Copyright -->
  </footer>
  <!-- Footer -->
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useSettingStore } from "../../stores/web/settingStore.js";
const { settings, loading } = storeToRefs(useSettingStore());
const { getSettings } = useSettingStore();
getSettings();
</script>
