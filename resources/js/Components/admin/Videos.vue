<template>
  <b-row>
    <b-card>
      <b-col>
        <b-row align-v="center">
          <b-col><h5>Videos List</h5></b-col>
          <b-col>
            <b-button
              @click="modal = !modal"
              class="float-end"
              pill
              variant="outline-dark"
            >
              <font-awesome-icon icon="plus" class="me-2" />Add Video</b-button
            >
            <div>
              <b-modal
                v-model="modal"
                title="Add Video"
                hide-header-close
                no-close-on-backdrop
              >
                <form id="uploadForm" enctype="multipart/form-data">
                  <b-form-group label="Select Video Type">
                    <b-form-radio-group
                      id="radio-group-1"
                      v-model="videoType"
                      :options="videoTypes"
                      @change="resetForm"
                    ></b-form-radio-group>
                  </b-form-group>

                  <div v-if="videoType == 1">
                    <input
                      type="file"
                      id="video"
                      accept="video/*"
                      class="form-control"
                      v-on:change="onFileChange"
                      :disabled="!loading ? false : true"
                    />
                    <span v-if="errors.video" class="text-danger">{{
                      errors.video[0]
                    }}</span>
                  </div>
                  <div v-else>
                    <b-form-input
                      type="url"
                      v-model="video_url"
                      placeholder="Enter your name"
                    ></b-form-input>

                    <span v-if="errors.url" class="text-danger">{{ errors.url[0] }}</span>
                  </div>
                  <div v-if="previewVideo">
                    <iframe
                      v-if="previewVideo.includes('https://www.youtube.com/')"
                      style="width: auto height: auto; width: auto; max-height: 200px; max-width: 300px"
                      :src="previewVideo"
                      allowfullscreen
                    >
                    </iframe>
                    <video
                      v-else
                      style="width: auto height: auto; width: auto; max-height: 200px; max-width: 300px"
                      controls
                      muted
                    >
                      <source :src="previewVideo" />
                    </video>
                  </div>
                  <!-- <b-img
                    v-if="previewVideo"
                    :src="previewVideo"
                    class="mt-2"
                    style="height: auto; width: auto; max-height: 250px; max-width: 450px"
                    rounded
                  ></b-img> -->
                </form>

                <template #footer>
                  <div>
                    <button class="btn btn-outline-dark" @click="hideModel">Close</button>
                  </div>
                  <div>
                    <button class="btn btn-outline-primary" @click="uploadFile">
                      {{ edit_id ? "Update Video" : "Add Video" }}
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
          :items="videos"
          :fields="fields"
          :busy="isBusy"
          responsive
          small
          show-empty
        >
          <template #cell(video)="data">
            <iframe
              v-if="data.item.src.includes('https://www.youtube.com/')"
              style="width: auto height: auto; width: auto; max-height: 200px; max-width: 300px"
              :src="data.item.src"
              allowfullscreen
            >
            </iframe>
            <video
              v-else
              style="width: auto height: auto; width: auto; max-height: 200px; max-width: 300px"
              controls
              muted
            >
              <source :src="data.item.src" />
            </video>
          </template>
          <template #cell(username)="data">{{ data.item.user.name }}</template>
          <template #cell(created_at)="data">{{ dateTime(data.value) }}</template>
          <template #cell(actions)="data">
            <b-button
              class="rounded-circle p-2 me-2"
              @click="editVideo(data.item.id)"
              variant="outline-success"
            >
              <font-awesome-icon icon="pen" />
            </b-button>

            <b-button
              class="rounded-circle p-2 me-2"
              @click="deleteVideo(data.item.id)"
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
            v-on:click="getVideos"
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

import { useVideosStore } from "../../stores/admin/videosStore.js";
const {
  videos,
  fields,
  options,
  perPage,
  currentPage,
  modal,
  rows,
  isBusy,
  previewVideo,
  videoTypes,
  videoType,
  video_url,
  loading,
  edit_id,
  errors,
} = storeToRefs(useVideosStore());

const {
  getVideos,
  setPerPage,
  dateTime,
  onFileChange,
  resetForm,
  hideModel,
  uploadFile,
  editVideo,
  deleteVideo,
} = useVideosStore();

getVideos();
resetForm;
</script>
