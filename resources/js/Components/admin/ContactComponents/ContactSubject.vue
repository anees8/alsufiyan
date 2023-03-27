<template>
  <b-row>
    <b-card>
      <b-col>
        <b-row align-v="center">
          <b-col><h5>Contact Subject List</h5></b-col>
          <b-col>
            <b-button
              @click="modal = !modal"
              class="float-end"
              pill
              variant="outline-dark"
            >
              <font-awesome-icon icon="plus" class="me-2" />Add Contact Subject</b-button
            >
            <b-modal
              v-model="modal"
              :title="subject.id ? 'Update Contact Subject' : 'Add Contact Subject'"
              hide-header-close
              no-close-on-backdrop
            >
              <b-form-group
                id="input-group-1"
                label="Contact Subject Title:"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="subject.subject"
                  type="text"
                  placeholder="Enter Contact Subject Title"
                  required
                ></b-form-input>
                <b-form-invalid-feedback v-if="errors.subject" :state="errors.subject">
                  {{ errors.subject[0] }}
                </b-form-invalid-feedback>
              </b-form-group>

              <template #footer>
                <div>
                  <button class="btn btn-outline-dark" @click="hideModel">Close</button>
                </div>
                <div>
                  <button class="btn btn-outline-primary" @click="uploadData">
                    {{ subject.id ? "Update Contact Subject" : "Add Contact Subject" }}
                  </button>
                </div>
              </template>
            </b-modal>
            <div></div>
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
              v-if="!data.item.deleted_at"
              class="rounded-circle p-2 me-2"
              @click="recycleContactSubject(data.item.id)"
              variant="outline-secondary"
            >
              <font-awesome-icon icon="recycle" />
            </b-button>

            <b-button
              v-if="data.item.deleted_at"
              class="rounded-circle p-2 me-2"
              @click="restoreContactSubject(data.item.id)"
              variant="outline-primary"
            >
              <font-awesome-icon icon="arrow-rotate-left" />
            </b-button>
            <b-button
              class="rounded-circle p-2 me-2"
              @click="deleteContactSubject(data.item.id)"
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
  subject,
  fields,
  options,
  perPage,
  currentPage,
  modal,
  rows,
  errors,
  isBusy,
} = storeToRefs(useContactSubjectsStore());

const {
  getContactSubject,
  setPerPage,
  dateTime,
  hideModel,
  resetForm,
  editContactSubject,
  recycleContactSubject,
  restoreContactSubject,
  deleteContactSubject,
  uploadData,
} = useContactSubjectsStore();

getContactSubject();
</script>
