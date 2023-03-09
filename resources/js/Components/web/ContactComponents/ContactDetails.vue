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
        ><b-card class="h-100">
          <font-awesome-icon icon="location-dot" size="xl" />

          <hr class="mx-5" />

          <p>
            <span class="fw-bold">Address : </span>
            <span class="font-monospace fst-italic"
              >198 West 21th Street, Suite 721 New York NY 10016</span
            >
          </p>
        </b-card> </b-col
      ><b-col cols="12" class="col-md-3"
        ><b-card class="h-100">
          <font-awesome-icon icon="phone" size="xl" />
          <hr class="mx-5" />
          <p>
            <span class="fw-bold">Phone : </span>
            <span class="font-monospace fst-italic"> + 01 234 567 89</span>
          </p>
        </b-card></b-col
      ><b-col cols="12" class="col-md-3"
        ><b-card class="h-100">
          <font-awesome-icon icon="envelope" size="xl" />

          <hr class="mx-5" />
          <p>
            <span class="fw-bold">Email : </span>
            <span class="font-monospace fst-italic"> info@example.com</span>
          </p>
        </b-card></b-col
      ><b-col cols="12" class="col-md-3"
        ><b-card class="h-100">
          <font-awesome-icon icon="fa-regular fa-clock" size="xl" />

          <hr class="mx-5" />
          <p>
            <span class="fw-bold">OPENING TIMES : </span>
            <span class="font-monospace fst-italic">
              Monday - Friday : 10:00AM - 11:00PM </span
            ><br />
            <span class="font-monospace fst-italic"> Saturday : 10:00 AM - 07:00 PM</span>
          </p>
        </b-card></b-col
      ></b-row
    ></b-container
  >
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useSettingStore } from "../../../stores/web/settingStore.js";
import ContactForm from "./ContactForm.vue";

const { logo, slogo } = storeToRefs(useSettingStore());
</script>
