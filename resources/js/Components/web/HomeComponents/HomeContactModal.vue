<template>
  <b-modal size="xl" v-model="modal" title="Contact us" hide-footer no-close-on-backdrop>
    <b-container fluid>
      <b-row class="no-gutters align-items-start">
        <b-col cols="12" lg="6">
          <b-img
            class="w-100"
            center
            style="border: 0; max-height: 600px"
            loading="lazy"
            :src="'/poster/poster.png'"
            fluid
          ></b-img>
        </b-col>
        <b-col cols="12" lg="6">
          <ContactForm />
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { ref, computed, defineAsyncComponent } from "vue";

import { useContactStore } from "../../../stores/web/contactStore.js";
const { modal } = storeToRefs(useContactStore());
const { changeModel } = useContactStore();
const ContactForm = defineAsyncComponent(() =>
  import("../ContactComponents/ContactForm.vue")
);

computed: {
  setTimeout(function () {
    changeModel();
  }, 2000);
}
// onMounted(() => {
//   setTimeout(function () {
//     changeModel();
//   }, 2000);
// });
</script>
