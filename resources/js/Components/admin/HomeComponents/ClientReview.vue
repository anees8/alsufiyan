<template>
  <b-row>
    <b-card>
      <b-col>
        <b-row align-v="center">
          <b-col><h5>Client Review List</h5></b-col>
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
          :items="reviews"
          :fields="fields"
          :busy="isBusy"
          responsive
          show-empty
        >
          <template #cell(comment_date)="data">{{ dateTime(data.value) }}</template>
          <template #cell(actions)> </template> </b-table
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
            v-on:click="getReviews"
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

import { useAdminReviewsStore } from "../../../stores/admin/HomeComponents/reviewsStore.js";
const { reviews, fields, options, perPage, currentPage, rows, isBusy } = storeToRefs(
  useAdminReviewsStore()
);

const { getReviews, dateTime, setPerPage } = useAdminReviewsStore();

getReviews();
</script>
