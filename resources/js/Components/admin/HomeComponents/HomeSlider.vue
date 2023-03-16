<template>
    <b-row>
      <b-card>
        <b-col>
          <b-row align-v="center">
            <b-col><h5>Home Slider List</h5></b-col>
            <b-col>
              <b-button
                @click="modal = !modal"
                class="float-end"
                pill
                variant="outline-dark"
              >
                <font-awesome-icon icon="plus" class="me-2" />Add Home Slider</b-button
              >
              <div>
                <b-modal
                  v-model="modal"
                  title="Add Home Slider"
                  hide-header-close
                  no-close-on-backdrop
                >
                  <form id="uploadForm" enctype="multipart/form-data">
                    <b-form-group label="Select Image Type">
                      <b-form-radio-group
                        id="radio-group-1"
                        v-model="slider.imageType"
                        :options="imageTypes"
                        @change="resetForm"
                      ></b-form-radio-group>
                    </b-form-group>
  
                    <div v-if="slider.imageType == 1">
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
                        v-model="slider.image_url"
                        placeholder="Enter Image Url"
                      ></b-form-input>
  
                      <span v-if="errors.url" class="text-danger">{{ errors.url[0] }}</span>
                    </div>
                    <div>
                      <b-form-group id="input-group-2" label="Your Description:" label-for="input-2">
                  <b-form-input
                    id="input-2"
                    v-model="slider.content"
                    placeholder="Enter Content"
                    required
                  ></b-form-input>
        </b-form-group>
                    </div>
                    <b-img
                      v-if="slider.previewImage"
                      :src="slider.previewImage"
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
                        {{ slider.edit_id ? "Update Home Slider" : "Add Home Slider" }}
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
            :items="sliders"
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
            <template #cell(username)="data">{{ data.item.user.name }}</template>
            <template #cell(created_at)="data">{{ dateTime(data.value) }}</template>
            <template #cell(actions)="data">
              <b-button
                class="rounded-circle p-2 me-2"
                @click="editHomeSlider(data.item.id)"
                variant="outline-success"
              >
                <font-awesome-icon icon="pen" />
              </b-button>
  
              <b-button
                class="rounded-circle p-2 me-2"
                @click="deleteHomeSlider(data.item.id)"
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
              v-on:click="getHomesliders"
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
  
  import { useAdminSliderStore } from "../../../stores/admin/HomeComponents/sliderStore";
  const {
    sliders,
    fields,
    options,
    perPage,
    currentPage,
    modal,
    rows,
    isBusy,
    imageTypes,
    slider,  
    loading,   
    errors,
  } = storeToRefs(useAdminSliderStore());
  
  const {
    getHomesliders,
    setPerPage,
    dateTime,
    onFileChange,
    resetForm,
    hideModel,
    uploadFile,
    editHomeSlider,
    deleteHomeSlider,
  } = useAdminSliderStore();
  
  getHomesliders();
  </script>
  