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
    <div class="row d-flex align-self-center pb-5 text-center">
      <div class="col-12 col-md-3 card d-flex align-items-center justify-content-center">
        <font-awesome-icon
          icon="location-dot"
          class="btn btn-dark rounded-circle my-3 p-3"
        />

        <p>
          <span>Address: </span> <br />198 West 21th Street, Suite 721 New York NY 10016
        </p>
      </div>
      <div class="col-12 col-md-3 card d-flex align-items-center justify-content-center">
        <font-awesome-icon icon="phone" class="btn btn-dark rounded-circle my-3 p-3" />

        <p>
          <span>Phone: </span> <br />
          + 01 234 567 89
        </p>
      </div>
      <div class="col-12 col-md-3 card d-flex align-items-center justify-content-center">
        <font-awesome-icon icon="envelope" class="btn btn-dark rounded-circle my-3 p-3" />

        <p>
          <span>Email: </span> <br />
          info@example.com
        </p>
      </div>
      <div class="col-12 col-md-3 card d-flex align-items-center justify-content-center">
        <font-awesome-icon
          icon="fa-regular fa-clock"
          class="btn btn-dark rounded-circle my-3 p-3"
        />

        <p>
          <span>OPENING TIMES : </span> <br />Monday: Friday: 10:00 AM - 11:00 PM
          <br />Saturday: 10:00 AM - 07:00 PM
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useSettingStore } from "../../../stores/web/settingStore.js";
import ContactForm from "./ContactForm.vue";

const { logo, slogo } = storeToRefs(useSettingStore());
</script>
