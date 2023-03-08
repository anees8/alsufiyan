<template>
  <b-row>
    <b-card>
      <b-col>
        <b-row align-v="center">
          <b-col><h5>Contact Subjects List</h5></b-col>
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
          :items="subjects"
          :fields="fields"
          :busy="isBusy"
          responsive
          show-empty
        >
          <template #cell(created_at)="data">{{ dateTime(data.value) }}</template>
          <template #cell(actions)="data">
            <b-button
              class="rounded-circle p-2 me-2"
              @click="editContactSubject(data.item.id)"
              variant="outline-success"
            >
              <font-awesome-icon icon="pen" />
            </b-button>

            <b-button
              class="rounded-circle p-2 me-2"
              @click="deleteContactSubject(data.item.id)"
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
            v-on:click="getContactSubject"
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

import { useContactSubjectsStore } from "../../../stores/admin/ContactComponents/contactsubjectStore.js";
const {
  subjects,
  fields,
  options,
  perPage,
  currentPage,

  rows,
  isBusy,
} = storeToRefs(useContactSubjectsStore());

const {
  getContactSubject,
  setPerPage,
  dateTime,
  editContactSubject,
  deleteContactSubject,
} = useContactSubjectsStore();

getContactSubject();
</script>
