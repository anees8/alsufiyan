<template>
  <b-row>
    <b-card>
      <b-col>
        <b-row align-v="center">
          <b-col><h5>Image List</h5></b-col>
          <b-col>
            <b-button
              v-if="permissions.includes('image_add')"
              @click="modal = !modal"
              class="float-end"
              pill
              variant="outline-dark"
            >
              <font-awesome-icon icon="plus" class="me-2" />Add Image</b-button
            >
            <div>
              <b-modal
                v-model="modal"
                :title="edit_id ? 'Update Image' : 'Add Image'"
                hide-header-close
                no-close-on-backdrop
              >
                <form id="uploadForm" enctype="multipart/form-data">
                  <b-form-group label="Select Image Type">
                    <b-form-radio-group
                      id="radio-group-1"
                      v-model="imageType"
                      :options="imageTypes"
                      @change="resetForm"
                    ></b-form-radio-group>
                  </b-form-group>

                  <div v-if="imageType == 1">
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
                      v-model="image_url"
                      placeholder="Enter your name"
                    ></b-form-input>

                    <span v-if="errors.url" class="text-danger">{{ errors.url[0] }}</span>
                  </div>
                  <b-img
                    v-if="previewImage"
                    :src="previewImage"
                    class="mt-2"
                    style="height: auto; width: auto; max-height: 250px; max-width: 450px"
                    rounded
                    loading="lazy"
                  ></b-img>
                </form>

                <template #footer>
                  <div>
                    <button class="btn btn-outline-dark" @click="hideModel">Close</button>
                  </div>
                  <div>
                    <button class="btn btn-outline-primary" @click="uploadFile">
                      {{ edit_id ? "Update Image" : "Add Image" }}
                    </button>
                  </div>
                </template>
              </b-modal>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col v-if="isBusy">
        <b-skeleton-table :rows="perPage" :columns="fields"></b-skeleton-table>
      </b-col>
      <b-col v-else
        ><b-table
          striped
          outlined
          empty-filtered-text
          caption-top
          hover
          footClone
          :items="images"
          :fields="fields"
          :busy="isBusy"
          responsive
          show-empty
        >
          <template #cell(image)="data">
            <b-img
              loading="lazy"
              :src="data.item.src"
              style="width: auto height: auto; width: auto; max-height: 100px; max-width: 300px"
              rounded
            ></b-img>
          </template>
          <template #cell(username)="data">{{
            data.item.user ? data.item.user.name : ""
          }}</template>
          <template #cell(created_at)="data">{{ dateTime(data.value) }}</template>
          <template #cell(actions)="data">
            <b-button
              v-if="permissions.includes('image_edit')"
              class="rounded-circle p-2 me-2"
              @click="editImage(data.item.id)"
              variant="outline-success"
            >
              <font-awesome-icon icon="pen" />
            </b-button>

            <b-button
              v-if="!data.item.deleted_at && permissions.includes('image_delete')"
              class="rounded-circle p-2 me-2"
              @click="recycleImage(data.item.id)"
              variant="outline-secondary"
            >
              <font-awesome-icon icon="recycle" />
            </b-button>

            <b-button
              v-if="data.item.deleted_at && permissions.includes('image_restore')"
              class="rounded-circle p-2 me-2"
              @click="restoreImage(data.item.id)"
              variant="outline-primary"
            >
              <font-awesome-icon icon="arrow-rotate-left" />
            </b-button>
            <b-button
              v-if="permissions.includes('image_forceDelete')"
              class="rounded-circle p-2 me-2"
              @click="deleteImage(data.item.id)"
              variant="outline-danger"
            >
              <font-awesome-icon icon="fa-regular fa-trash-can" />
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
            v-on:click="getImages"
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
import { useLoginStore } from "../../stores/admin/loginStore.js";

import { useAdminImagesStore } from "../../stores/admin/imagesStore.js";
const {
  images,
  fields,
  options,
  perPage,
  currentPage,
  modal,
  rows,
  isBusy,
  previewImage,
  imageTypes,
  imageType,
  image_url,
  loading,
  edit_id,
  errors,
} = storeToRefs(useAdminImagesStore());

const {
  getImages,
  setPerPage,
  dateTime,
  onFileChange,
  resetForm,
  hideModel,
  uploadFile,
  editImage,
  recycleImage,
  restoreImage,
  deleteImage,
} = useAdminImagesStore();

const { permissions } = storeToRefs(useLoginStore());
getImages();
</script>
