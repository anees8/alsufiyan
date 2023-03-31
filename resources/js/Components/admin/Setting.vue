<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="6">
          <b-card header="General">
            <b-form @submit="onSettingChange">
              <b-container fluid>
                <b-row class="mb-3">
                  <b-col>
                    <b-img
                      start
                      v-bind="{ width: 75, height: 75, class: 'm1' }"
                      rounded="circle"
                      :src="previewlogo"
                      alt="Center image"
                    ></b-img> </b-col
                  ><b-col>
                    <input
                      type="file"
                      id="logo"
                      accept="image/*"
                      class="form-control"
                      v-on:change="onFileChange"
                    />
                  </b-col>
                </b-row>
                <b-row class="mb-3">
                  <b-col>
                    <b-img
                      start
                      v-bind="{ height: 75, class: 'm1' }"
                      rounded
                      :src="previewslogo"
                      alt="Center image"
                    ></b-img>
                  </b-col>
                  <b-col>
                    <input
                      id="slogo"
                      type="file"
                      accept="image/*"
                      class="form-control"
                      v-on:change="onFileChange"
                  /></b-col>
                </b-row>
                <b-row class="mb-3">
                  <b-form-group label="Footer About" class="mb-0">
                    <b-form-textarea
                      id="textarea"
                      v-model="footer_about"
                      placeholder="Enter Footer About..."
                      rows="3"
                      max-rows="6"
                    ></b-form-textarea>
                  </b-form-group>
                </b-row>
              </b-container>
              <b-button type="submit" variant="primary">Submit</b-button>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useLoginStore } from "../../stores/admin/loginStore.js";

import { useAdminSettingStore } from "../../stores/admin/settingsStore";
const {
  logo,
  slogo,
  previewlogo,
  previewslogo,
  footer_about,
  loading,
  errors,
} = storeToRefs(useAdminSettingStore());

const { onFileChange, getSettings, onSettingChange } = useAdminSettingStore();

const { permissions } = storeToRefs(useLoginStore());

getSettings();
</script>
