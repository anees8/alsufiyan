<template>
  <b-row>
    <b-card>
      <b-col>
        <b-row align-v="center">
          <b-col><h5>Home Package List</h5></b-col>
          <b-col>
            <b-button
              @click="modal = !modal"
              class="float-end"
              pill
              variant="outline-dark"
            >
              <font-awesome-icon icon="plus" class="me-2" />Add Home Package</b-button
            >
            <div>
              <b-modal
                v-model="modal"
                :title="pack.edit_id ? 'Update Home Package' : 'Add Home Package'"
              
                hide-header-close
                no-close-on-backdrop
              >
                <form id="uploadForm" enctype="multipart/form-data">
                  <b-form-group label="Select Image Type">
                    <b-form-radio-group
                      id="radio-group-1"
                      v-model="pack.imageType"
                      :options="imageTypes"
                      @change="resetForm"
                    ></b-form-radio-group>
                  </b-form-group>

                  <div v-if="pack.imageType == 1">
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      class="form-control"
                      v-on:change="onFileChange"
                      :disabled="!loading ? false : true"
                    />
                    <span v-if="errors.image" class="text-danger">{{
                      errors.image[0]
                    }}</span>
                  </div>
                  <div v-else>
                    <b-form-input
                      type="url"
                      v-model="pack.image_url"
                      placeholder="Enter Image Url"
                    ></b-form-input>

                    <span v-if="errors.url" class="text-danger">{{ errors.url[0] }}</span>
                  </div>
                  <div>
                    <b-form-group id="input-group-2" label="Title:" label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="pack.title"
                  placeholder="Enter Title"
                  required
                ></b-form-input>
                <b-form-invalid-feedback v-if="errors.title" :state="errors.title">
                  {{ errors.title[0] }}
                </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
                id="input-group-3"
                label="Description::"
                label-for="input-3"
              >
                <b-form-textarea
                  id="textarea"
                  v-model="pack.description"
                  placeholder="Enter Description..."
                  rows="6"
                ></b-form-textarea>
                <b-form-invalid-feedback v-if="errors.description" :state="errors.description">
                  {{ errors.description[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
      <b-form-group id="input-group-2" label="Days:" label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="pack.days"
                  placeholder="Enter Days (eg: 10 or 10-15 )"
                  required
                ></b-form-input>
                <b-form-invalid-feedback v-if="errors.days" :state="errors.days">
                  {{ errors.days[0] }}
                </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="input-group-2" label="Price:" label-for="input-2">
                <b-form-input
                  id="input-2"
                  type="number"
                  v-model="pack.price"
                  placeholder="Enter Price"
                  required
                ></b-form-input>
                <b-form-invalid-feedback v-if="errors.price" :state="errors.price">
                  {{ errors.price[0] }}
                </b-form-invalid-feedback>
      </b-form-group>
                  </div>
                  <b-img
                    v-if="pack.previewImage"
                    :src="pack.previewImage"
                    class="mt-2"
                    style="height: auto; width: auto; max-height: 250px; max-width: 450px"
                    rounded
                  ></b-img>
                </form>

                <template #footer>
                  <div>
                    <button class="btn btn-outline-dark" @click="hideModel">Close</button>
                  </div>
                  <div>
                    <button class="btn btn-outline-primary" @click="uploadFile">
                      {{ pack.edit_id ? "Update Home Package" : "Add Home Package" }}
                    </button>
                  </div>
                </template>
              </b-modal>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col
        ><b-table
          striped
          outlined
          empty-filtered-text
          caption-top
          hover
          footClone
          :items="packages"
          :fields="fields"
          :busy="isBusy"
          responsive
          show-empty
        >
          <template #cell(image)="data">
            <b-img
              :src="data.item.image"
              style="width: auto height: auto; width: auto; max-height: 100px; max-width: 300px"
              rounded
            ></b-img>
          </template>
          <template #cell(username)="data">{{ data.item.user?data.item.user.name:""}}</template>
          <template #cell(created_at)="data">{{ dateTime(data.value) }}</template>
          <template #cell(actions)="data">
            <b-button
              class="rounded-circle p-2 me-2"
              @click="editHomePackage(data.item.id)"
              variant="outline-success"
            >
              <font-awesome-icon icon="pen" />
            </b-button>

            <b-button
              class="rounded-circle p-2 me-2"
              @click="deleteHomePackage(data.item.id)"
              variant="outline-danger"
            >
              <font-awesome-icon icon="fa-regular fa-trash-alt" />
            </b-button>
          </template> </b-table
      ></b-col>
      <b-row align-h="end" class="mt-5">
        <b-col xl="1" lg="2" md="2" class="p-2">
          <b-form-select
            v-if="rows > 5"
            v-model="perPage"
            :options="options"
            size="md"
            v-on:change="setPerPage"
            varient="dark"
          ></b-form-select>
        </b-col>
        <b-col xl="5" lg="6" md="8" class="p-2">
          <b-pagination
            v-if="rows / perPage > 1"
            v-on:click="getHomePackages"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
          ></b-pagination>
        </b-col>
      </b-row>
    </b-card>
  </b-row>
</template>
<script setup>
import { storeToRefs } from "pinia";

import { useAdminPackageStore } from "../../../stores/admin/HomeComponents/packageStore";
const {
  packages,
  fields,
  options,
  perPage,
  currentPage,
  modal,
  rows,
  isBusy,
  imageTypes,
  pack,  
  loading,   
  errors,
} = storeToRefs(useAdminPackageStore());

const {
  getHomePackages,
  setPerPage,
  dateTime,
  onFileChange,
  resetForm,
  hideModel,
  uploadFile,
  editHomePackage,
  deleteHomePackage,
} = useAdminPackageStore();

getHomePackages();
</script>
