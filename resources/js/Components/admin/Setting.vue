<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-card header="General Setting">
            <span class="text-success" v-if="message"> {{ message }}</span>
            <b-form @submit="onSettingChange">
              <b-container fluid>
                <b-row>
                  <b-col col="12" lg="6">
                    <b-form-group
                      id="input-group-2"
                      label="Company Name:"
                      label-for="input-2"
                    >
                      <b-input-group class="mt-1">
                        <template #prepend>
                          <b-input-group-text
                            ><font-awesome-icon icon="briefcase" />
                          </b-input-group-text>
                        </template>
                        <b-form-input
                          id="input-2"
                          v-model="settings.CompanyName"
                          placeholder="Enter Company name"
                        ></b-form-input>
                      </b-input-group>
                      <b-form-invalid-feedback
                        v-if="errors.CompanyName"
                        :state="errors.CompanyName"
                      >
                        {{ errors.CompanyName[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                  <b-col col="12" lg="6">
                    <b-form-group
                      id="input-group-1"
                      label="Email address:"
                      label-for="input-1"
                    >
                      <b-input-group class="mt-1">
                        <template #prepend>
                          <b-input-group-text
                            ><font-awesome-icon icon="at" />
                          </b-input-group-text>
                        </template>
                        <b-form-input
                          id="input-1"
                          v-model="settings.email"
                          type="email"
                          placeholder="Enter email"
                        ></b-form-input
                      ></b-input-group>
                      <b-form-invalid-feedback v-if="errors.email" :state="errors.email">
                        {{ errors.email[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                  <b-col col="12" lg="6">
                    <b-form-group
                      id="input-group-2"
                      label="Phone Number:"
                      label-for="input-2"
                    >
                      <b-input-group class="mt-1">
                        <template #prepend>
                          <b-input-group-text
                            ><font-awesome-icon icon="mobile-screen" />
                          </b-input-group-text>
                        </template>
                        <b-form-input
                          id="input-2"
                          v-model="settings.CompanyPhone"
                          placeholder="Enter Company Phone"
                        ></b-form-input>
                      </b-input-group>
                      <b-form-invalid-feedback
                        v-if="errors.CompanyPhone"
                        :state="errors.CompanyPhone"
                      >
                        {{ errors.CompanyPhone[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                  <b-col col="12" lg="6">
                    <b-form-group
                      id="input-group-2"
                      label="Alternate Phone Number:"
                      label-for="input-2"
                    >
                      <b-input-group class="mt-1">
                        <template #prepend>
                          <b-input-group-text
                            ><font-awesome-icon icon="mobile-screen" />
                          </b-input-group-text>
                        </template>
                        <b-form-input
                          id="input-2"
                          v-model="settings.CompanyAlternatePhone"
                          placeholder="Enter Company Alternate Phone"
                        ></b-form-input
                      ></b-input-group>
                      <b-form-invalid-feedback
                        v-if="errors.CompanyAlternatePhone"
                        :state="errors.CompanyAlternatePhone"
                      >
                        {{ errors.CompanyAlternatePhone[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>

                  <b-col col="12" lg="6">
                    <b-form-group
                      id="input-group-2"
                      label="Facebook Link:"
                      label-for="input-2"
                    >
                      <b-input-group class="mt-1">
                        <template #prepend>
                          <b-input-group-text
                            ><font-awesome-icon icon="fa-brands fa-facebook-f" />
                          </b-input-group-text>
                        </template>
                        <b-form-input
                          id="input-2"
                          v-model="settings.facebook"
                          placeholder="Enter Your Facebook link"
                        ></b-form-input>
                      </b-input-group>
                      <b-form-invalid-feedback
                        v-if="errors.facebook"
                        :state="errors.facebook"
                      >
                        {{ errors.facebook[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                  <b-col col="12" lg="6">
                    <b-form-group
                      id="input-group-2"
                      label="Whatsapp Link:"
                      label-for="input-2"
                    >
                      <b-input-group class="mt-1">
                        <template #prepend>
                          <b-input-group-text
                            ><font-awesome-icon icon="fa-brands fa-whatsapp" />
                          </b-input-group-text>
                        </template>
                        <b-form-input
                          id="input-2"
                          v-model="settings.whatsapp"
                          placeholder="Enter Your whatsapp link"
                        ></b-form-input>
                      </b-input-group>
                      <b-form-invalid-feedback
                        v-if="errors.whatsapp"
                        :state="errors.whatsapp"
                      >
                        {{ errors.whatsapp[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                  <b-col col="12" lg="6">
                    <b-form-group
                      id="input-group-2"
                      label="Youtube Channel Link:"
                      label-for="input-2"
                    >
                      <b-input-group class="mt-1">
                        <template #prepend>
                          <b-input-group-text
                            ><font-awesome-icon icon="fa-brands fa-youtube" />
                          </b-input-group-text>
                        </template>
                        <b-form-input
                          id="input-2"
                          v-model="settings.youtube"
                          placeholder="Enter Your Youtube link"
                        ></b-form-input>
                      </b-input-group>
                      <b-form-invalid-feedback
                        v-if="errors.youtube"
                        :state="errors.youtube"
                      >
                        {{ errors.youtube[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" lg="6">
                    <b-form-group label="Company Address" class="mb-0">
                      <b-form-textarea
                        id="textarea"
                        v-model="settings.CompanyAdress"
                        placeholder="Enter Company Adress..."
                        rows="1"
                      ></b-form-textarea>
                      <b-form-invalid-feedback
                        v-if="errors.CompanyAdress"
                        :state="errors.CompanyAdress"
                      >
                        {{ errors.CompanyAdress[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>

                  <b-col cols="12" lg="6">
                    <b-form-group label="Footer About" class="mb-0">
                      <b-form-textarea
                        id="textarea"
                        v-model="settings.footer"
                        placeholder="Enter Footer About..."
                        rows="3"
                      ></b-form-textarea>
                      <b-form-invalid-feedback
                        v-if="errors.footer"
                        :state="errors.footer"
                      >
                        {{ errors.footer[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>

                  <b-col cols="12" lg="6">
                    <b-form-group label="Opening Time" class="mb-0">
                      <QuillEditor
                        v-model:content="settings.openingTime"
                        contentType="html"
                      />
                      <b-form-invalid-feedback
                        v-if="errors.openingTime"
                        :state="errors.openingTime"
                      >
                        {{ errors.openingTime[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                  <b-col col="12" lg="6">
                    <b-form-group
                      id="input-group-2"
                      label="Copyright:"
                      label-for="input-2"
                    >
                      <QuillEditor
                        v-model:content="settings.copyright"
                        contentType="html"
                      />

                      <b-form-invalid-feedback
                        v-if="errors.copyright"
                        :state="errors.copyright"
                      >
                        {{ errors.copyright[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" lg="6"></b-col>
                  <b-col cols="12" md="6">
                    <b-form-group label="ICON" class="mb-0">
                      <input
                        type="file"
                        id="logo"
                        accept="image/*"
                        class="form-control"
                        v-on:change="onFileChange"
                      />
                      <b-form-invalid-feedback v-if="errors.logo" :state="errors.logo">
                        {{ errors.logo[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" lg="6">
                    <b-img
                      start
                      v-bind="{ width: 75, height: 75, class: 'm1' }"
                      rounded="circle"
                      :src="previewlogo"
                      alt="Center image"
                    ></b-img>
                  </b-col>

                  <b-col cols="12" lg="6">
                    <b-form-group label="LOGO" class="mb-0">
                      <input
                        id="slogo"
                        type="file"
                        accept="image/*"
                        class="form-control"
                        v-on:change="onFileChange"
                      />
                      <b-form-invalid-feedback v-if="errors.slogo" :state="errors.slogo">
                        {{ errors.slogo[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" lg="6">
                    <b-img
                      start
                      v-bind="{ height: 50, class: 'm1' }"
                      rounded
                      :src="previewslogo"
                      alt="Center image"
                    ></b-img>
                  </b-col>
                </b-row>
              </b-container>
              <b-button type="submit" variant="dark" :disabled="!loading ? false : true"
                >Update</b-button
              >
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
const { settings, previewlogo, previewslogo, loading, message, errors } = storeToRefs(
  useAdminSettingStore()
);

const { onFileChange, getSettings, onSettingChange } = useAdminSettingStore();

const { permissions } = storeToRefs(useLoginStore());

getSettings();
</script>
