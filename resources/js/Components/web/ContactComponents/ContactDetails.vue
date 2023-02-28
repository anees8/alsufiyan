<template>
  <div class="container py-5">
    <div class="row py-5 my-5 no-gutters align-items-center">
      <div class="col-md-6">
        <div class="d-flex align-items-center justify-content-center">
          <img class="w-50 contact-form-logo" :src="logo" />
        </div>
        <div class="d-flex align-items-center justify-content-center">
          <img :src="slogo" alt="" height="100" />
        </div>
      </div>

      <div class="col-md-6">
        <ContactForm />
      </div>
    </div>
    <div class="row d-flex align-self-center">
      <div class="col-12 col-md-3">
        <div class="d-flex align-items-center justify-content-center">
          <font-awesome-icon
            icon="location-dot"
            class="btn btn-dark rounded-circle my-3 p-3"
          />
        </div>
        <div class="d-flex align-items-center justify-content-center text-center">
          <p><span>Address: </span> 198 West 21th Street, Suite 721 New York NY 10016</p>
        </div>
      </div>
      <div class="col-12 col-md-3">
        <div class="d-flex align-items-center justify-content-center">
          <font-awesome-icon icon="phone" class="btn btn-dark rounded-circle my-3 p-3" />
        </div>
        <div class="d-flex align-items-center justify-content-center text-center">
          <p><span>Phone: </span> + 01 234 567 89</p>
        </div>
      </div>
      <div class="col-12 col-md-3">
        <div class="d-flex align-items-center justify-content-center">
          <font-awesome-icon
            icon="envelope"
            class="btn btn-dark rounded-circle my-3 p-3"
          />
        </div>
        <div class="d-flex align-items-center justify-content-center text-center">
          <p><span>Email: </span> info@example.com</p>
        </div>
      </div>
      <div class="col-12 col-md-3">
        <div class="d-flex align-items-center justify-content-center">
          <font-awesome-icon
            icon="fa-regular fa-clock"
            class="btn btn-dark rounded-circle my-3 p-3"
          />
        </div>
        <div class="d-flex align-items-center justify-content-center text-center">
          <p>
            <span>OPENING TIMES : </span> <br />Monday: Friday: 10:00 AM - 11:00 PM
            <br />Saturday: 10:00 AM - 07:00 PM
          </p>
        </div>
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
