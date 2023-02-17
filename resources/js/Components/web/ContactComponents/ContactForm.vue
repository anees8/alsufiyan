<template>
  <div class="container py-5">
    <div class="row py-5 my-5 no-gutters align-items-center">
      <div class="col-md-6">
        <div class="d-flex align-items-center justify-content-center">
          <img class="w-50 contact-form-logo" :src="'/logo/logo.png'" />
        </div>
        <div class="d-flex align-items-center justify-content-center">
          <img :src="'/logo/slogo2.png'" alt="" height="100" />
        </div>
      </div>

      <div class="col-md-6">
        <div>
          <span v-if="message" class="text-success">{{ message }}</span>

          <span v-if="errors.error" class="text-danger">{{ errors.error }}</span>
        </div>
        <b-form @submit.prevent="contact">
          <b-form-group label="Name" label-for="name">
            <b-form-input
              id="name"
              v-model="contactForm.name"
              :class="errors.name ? 'is-invalid' : ''"
              type="text"
            />
            <span v-if="errors.name" class="text-danger">{{ errors.name[0] }}</span>
          </b-form-group>
          <b-form-group label="Email" label-for="email">
            <b-form-input
              id="email"
              v-model="contactForm.email"
              :class="errors.email ? 'is-invalid' : ''"
              type="email"
            />
            <span v-if="errors.email" class="text-danger">{{ errors.email[0] }}</span>
          </b-form-group>
          <b-form-group label="phone" label-for="phone">
            <b-form-input
              id="phone"
              v-model="contactForm.phone"
              :class="errors.phone ? 'is-invalid' : ''"
              type="number"
            />
            <span v-if="errors.phone" class="text-danger">{{ errors.phone[0] }}</span>
          </b-form-group>
          <b-form-group label="Subject" label-for="subject">
            <b-form-input
              id="subject"
              v-model="contactForm.subject"
              :class="errors.subject ? 'is-invalid' : ''"
              type="text"
            />
            <span v-if="errors.subject" class="text-danger">{{ errors.subject[0] }}</span>
          </b-form-group>
          <b-form-group label="Message" label-for="message">
            <b-form-textarea
              id="message"
              v-model="contactForm.message"
              :class="errors.message ? 'is-invalid' : ''"
            />
            <span v-if="errors.message" class="text-danger">{{ errors.message[0] }}</span>
          </b-form-group>
          <div class="col-12">
            <b-button
              size="md"
              type="submit"
              variant="outline-dark"
              class="px-4 fw-bold d-flex m-auto"
              pill
            >
              <font-awesome-icon class="me-1" icon="paper-plane" /> Send
            </b-button>
          </div>
        </b-form>
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
          <font-awesome-icon icon="clock" class="btn btn-dark rounded-circle my-3 p-3" />
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
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useContactStore } from "../../../stores/web/contactStore.js";
const { contactForm, errors, message } = storeToRefs(useContactStore());
const { contact, resetForm } = useContactStore();

onMounted(() => {
  resetForm();
});
</script>
