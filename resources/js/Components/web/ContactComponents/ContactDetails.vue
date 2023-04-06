<template>
  <div class="container">
    <div class="row py-5 no-gutters align-items-center">
      <div class="col-md-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.503304308185!2d78.71704661526967!3d12.93961351907938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad7525c0f5c1db%3A0x1974ed10d9af623d!2sCool%20Trendz!5e0!3m2!1sen!2sin!4v1678257774147!5m2!1sen!2sin"
          style="border: 0; width: 100%; height: 650px"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div class="col-md-6 card p-0">
        <div class="card-header bg-dark text-white text-center h4">Contact Us</div>
        <div class="card-body py-5">
          <ContactForm />
        </div>
      </div>
    </div>
  </div>

  <b-container class="py-5 text-center text-uppercase">
    <b-row class="d-flex align-self-center pb-5 text-center"
      ><b-col cols="12" class="col-md-3"
        ><b-card class="h-100"
          ><div>
            <font-awesome-icon icon="location-dot" size="xl" class="my-2" />
          </div>
          <div>
            <span class="fw-bold">Address</span>
          </div>
          <hr class="mx-5 my-2" />

          <p>
            <span class="fw-normal">{{ settings.CompanyAdress }}</span>
          </p>
        </b-card> </b-col
      ><b-col cols="12" class="col-md-3"
        ><b-card class="h-100">
          <div><font-awesome-icon icon="phone" size="xl" class="my-2" /></div>
          <div><span class="fw-bold">Phone</span></div>
          <hr class="mx-5 my-2" />
          <p>
            <span class="fw-normal">{{ settings.CompanyPhone }}</span>
          </p>
          <p>
            <span class="fw-normal">{{ settings.CompanyAlternatePhone }}</span>
          </p>
        </b-card></b-col
      ><b-col cols="12" class="col-md-3"
        ><b-card class="h-100">
          <div><font-awesome-icon icon="envelope" size="xl" class="my-2" /></div>
          <div><span class="fw-bold">Email</span></div>
          <hr class="mx-5 my-2" />
          <p>
            <span class="fw-normal"> {{ settings.email }}</span>
          </p>
        </b-card></b-col
      ><b-col cols="12" class="col-md-3"
        ><b-card class="h-100">
          <div>
            <font-awesome-icon icon="clock" size="xl" class="my-2" />
          </div>
          <div><span class="fw-bold">OPENING TIMES</span></div>
          <hr class="mx-5 my-2" />

          <div v-html="settings.openingTime"></div> </b-card></b-col
    ></b-row>
    <Branch />
  </b-container>
</template>
<script setup>
import { defineAsyncComponent } from "vue";
import { storeToRefs } from "pinia";
import { useSettingStore } from "../../../stores/web/settingStore.js";
import ContactForm from "./ContactForm.vue";

const Branch = defineAsyncComponent(() => import("./branch.vue"));
const { settings, loading } = storeToRefs(useSettingStore());
const { getSettings } = useSettingStore();
getSettings();
</script>
