<template>
  <div class="container-fluid">
    <div class="row align-items-center justify-content-center vh-100">
      <div class="col-11 col-xl-3 col-lg-5 col-md-6 card shadow rounded p-md-4 p-2 py-5">
        <div class="text-center">
          <div class="d-flex mb-4 mt-2 align-items-center justify-content-center">
            <img loading="lazy" :src="settings.logo" width="50" />
            <img
              loading="lazy"
              v-if="settings.slogo"
              :src="settings.slogo"
              height="50"
              style="max-width: 10rem"
            />
          </div>
          <div>
            <div>
              <span v-if="errors.error" class="text-danger">{{ errors.error }}</span>
              <b-form @submit.prevent="login">
                <b-form-group>
                  <b-input-group>
                    <template #prepend>
                      <b-input-group-text
                        ><font-awesome-icon icon="at"
                      /></b-input-group-text>
                    </template>
                    <b-form-input
                      v-model="user.email"
                      :class="errors.email ? 'is-invalid' : ''"
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      :disabled="!loading ? false : true"
                    />
                  </b-input-group>
                  <span v-if="errors.email" class="text-danger">{{
                    errors.email[0]
                  }}</span>
                </b-form-group>

                <b-form-group>
                  <b-input-group>
                    <template #prepend>
                      <b-input-group-text
                        ><font-awesome-icon icon="fa-eye-slash"
                      /></b-input-group-text>
                    </template>
                    <b-form-input
                      id="password"
                      v-model="user.password"
                      :class="errors.password ? 'is-invalid' : ''"
                      type="password"
                      name="password"
                      placeholder="Password"
                      :disabled="!loading ? false : true"
                    />
                  </b-input-group>
                  <span v-if="errors.password" class="text-danger">{{
                    errors.password[0]
                  }}</span>
                </b-form-group>
                <div class="align-items-center">
                  <b-button variant="outline-dark" type="submit">
                    <b-spinner class="me-1" v-if="loading" small></b-spinner>
                    <span v-if="!loading">Login</span>
                    <span v-if="loading">Login...</span>
                    <font-awesome-icon v-if="!loading" class="ms-2" icon="arrow-right" />
                  </b-button>
                </div>
              </b-form>
              <RouterLink class="nav-link text-dark mt-3" v-bind:to="{ name: 'Home' }">
                <font-awesome-icon icon="arrow-left" class="me-2" />Back to
                Home</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useLoginStore } from "@/stores/admin/loginStore.js";
import { useSettingStore } from "../../stores/web/settingStore.js";
const { user, errors, loading } = storeToRefs(useLoginStore());
const { settings } = storeToRefs(useSettingStore());
const { getSettings } = useSettingStore();
const { login, resetForm } = useLoginStore();

resetForm();

getSettings();
</script>
