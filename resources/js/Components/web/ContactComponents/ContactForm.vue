<template>
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
        :disabled="!loading ? false : true"
      />
      <span v-if="errors.name" class="text-danger">{{ errors.name[0] }}</span>
    </b-form-group>
    <b-form-group label="Email" label-for="email">
      <b-form-input
        id="email"
        v-model="contactForm.email"
        :class="errors.email ? 'is-invalid' : ''"
        type="email"
        :disabled="!loading ? false : true"
      />
      <span v-if="errors.email" class="text-danger">{{ errors.email[0] }}</span>
    </b-form-group>
    <b-form-group label="Phone" label-for="phone">
      <b-form-input
        id="phone"
        v-model="contactForm.phone"
        :class="errors.phone ? 'is-invalid' : ''"
        type="number"
        :disabled="!loading ? false : true"
      />
      <span v-if="errors.phone" class="text-danger">{{ errors.phone[0] }}</span>
    </b-form-group>
    <b-form-group label="Subject" label-for="Subject">
      <b-form-select
        id="subject_id"
        v-model="contactForm.subject_id"
        :options="options"
        :class="errors.subject_id ? 'is-invalid' : ''"
        :disabled="!loading ? false : true"
      ></b-form-select>
      <span v-if="errors.subject_id" class="text-danger">{{ errors.subject_id[0] }}</span>
    </b-form-group>
    <b-form-group label="Message" label-for="message">
      <b-form-textarea
        id="message"
        v-model="contactForm.message"
        :class="errors.message ? 'is-invalid' : ''"
        :disabled="!loading ? false : true"
        rows="3"
      />
      <span v-if="errors.message" class="text-danger">{{ errors.message[0] }}</span>
    </b-form-group>
    <div class="col-12">
      <b-button
        size="md"
        type="submit"
        variant="outline-dark"
        :class="!loading ? false : true"
        class="px-4 fw-bold d-flex m-auto"
        pill
      >
        <font-awesome-icon v-if="!loading" class="me-1" icon="paper-plane" /><b-spinner
          class="me-1"
          v-if="loading"
          small
          variant="dark"
        ></b-spinner>
        <span v-if="loading">Sending...</span>
        <span v-if="!loading">Send</span>
      </b-button>
    </div>
  </b-form>
</template>
<script setup>
import { storeToRefs } from "pinia";

import { useContactStore } from "../../../stores/web/contactStore.js";
const { contactForm, options, errors, message, loading } = storeToRefs(useContactStore());
const { contact, resetForm, get_subject } = useContactStore();

resetForm();
get_subject();
</script>
