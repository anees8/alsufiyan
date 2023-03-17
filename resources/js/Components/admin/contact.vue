<template>
  <b-row>
    <b-card>
      <b-col>
        <b-row align-v="center">
          <b-col><h5>Contact List</h5></b-col>
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
          :items="contacts"
          :fields="fields"
          :busy="isBusy"
          responsive
          show-empty
        >
          <template #cell(subject)="data">{{ data.item.subject.subject }}</template>
          <template #cell(created_at)="data">{{ dateTime(data.value) }}</template>
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
            v-on:click="getContacts"
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

import { useContactsStore } from "../../stores/admin/contactsStore.js";
const {
  contacts,
  fields,
  options,
  perPage,
  currentPage,

  rows,
  isBusy,
} = storeToRefs(useContactsStore());

const { getContacts, setPerPage, dateTime } = useContactsStore();

getContacts();
</script>
