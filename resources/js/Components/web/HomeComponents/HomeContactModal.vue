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
            @click="show(settings.poster)"
            :src="settings.poster"
            fluid
          ></b-img>
        </b-col>
        <b-col cols="12" lg="6">
          <ContactForm />
        </b-col>
      </b-row>
      <vue-easy-lightbox
        :visible="visible"
        :imgs="currentindex"
        @hide="handleHide"
      ></vue-easy-lightbox>
    </b-container>
  </b-modal>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { ref, onMounted, defineAsyncComponent } from "vue";

import { useContactStore } from "../../../stores/web/contactStore.js";
import { useSettingStore } from "../../../stores/web/settingStore.js";
const { modal, visible, currentindex } = storeToRefs(useContactStore());
const { settings } = storeToRefs(useSettingStore());
const { changeModel, show, handleHide } = useContactStore();
const ContactForm = defineAsyncComponent(() =>
  import("../ContactComponents/ContactForm.vue")
);

onMounted(() => {
  setTimeout(function () {
    changeModel();
  }, 2000);
});
</script>
