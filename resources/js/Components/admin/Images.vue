<template>
  <b-row>
    <b-card>
      <b-col>
        <b-row>
          <b-col>Images List</b-col>
          <b-col><b-button variant="outline-dark">Add Image</b-button> </b-col>
        </b-row>
      </b-col>
      <b-col
        ><b-table striped hover :items="images" :fields="fields" :busy="isBusy">
          <template #cell(image)="data">
            <b-img
              :src="data.item.src"
              style="height: 100px; width: auto"
              rounded
            ></b-img>
          </template>
          <template #cell(username)="data">{{ data.item.user.name }}</template>
          <template #cell(created_at)="data">{{ dateTime(data.value) }}</template>
          <template #cell(actions)="data">
            <b-button class="rounded-circle p-2 me-2" variant="outline-success">
              <font-awesome-icon icon=" fa-regular fa-pen-to-square" />
            </b-button>

            <b-button class="rounded-circle p-2 me-2" variant="outline-danger">
              <font-awesome-icon icon="fa-regular fa-trash-alt" />
            </b-button>
          </template> </b-table
      ></b-col>
      <b-row align-h="end" class="mt-5">
        <b-col xl="1" lg="2" md="2" class="p-2">
          <b-form-select
            v-model="perPage"
            :options="options"
            size="md"
            v-on:change="setPerPage"
            varient="dark"
          ></b-form-select>
        </b-col>
        <b-col xl="5" lg="6" md="8" class="p-2">
          <b-pagination
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
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useImagesStore } from "../../stores/admin/imagesStore.js";
const { images, fields, options, perPage, currentPage, rows, isBusy } = storeToRefs(
  useImagesStore()
);

const { getImages, setPerPage, dateTime } = useImagesStore();

onMounted(() => {
  getImages();
});
</script>
