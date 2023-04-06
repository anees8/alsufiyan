<template>
  <b-row>
    <b-card>
      <b-col>
        <b-row align-v="center">
          <b-col><h5>Branch List</h5></b-col>
          <b-col>
            <b-button
              v-if="permissions.includes('our_branch_add')"
              @click="modal = !modal"
              class="float-end"
              pill
              variant="outline-dark"
            >
              <font-awesome-icon icon="plus" class="me-2" />Add Branch</b-button
            >
            <b-modal
              v-model="modal"
              :title="branch.id ? 'Update Branch' : 'Add Branch'"
              hide-header-close
              no-close-on-backdrop
            >
              <template #footer>
                <div>
                  <button class="btn btn-outline-dark" @click="hideModel">Close</button>
                </div>
                <div>
                  <button class="btn btn-outline-primary" @click="updateBranch">
                    {{ branch.id ? "Update Branch" : "Add Branch" }}
                  </button>
                </div>
              </template>
            </b-modal>
            <div></div>
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
          :items="branches"
          :fields="fields"
          :busy="isBusy"
          responsive
          show-empty
        >
          <template #cell(image)="data">
            <b-img
              loading="lazy"
              :src="data.item.image"
              style="width: auto height: auto; width: auto; max-height: 100px; max-width: 200px"
              rounded
            ></b-img>
          </template>

          <template #cell(actions)="data">
            <b-button
              v-if="permissions.includes('our_branch_edit')"
              class="rounded-circle p-2 me-2"
              @click="editBranch(data.item.id)"
              variant="outline-success"
            >
              <font-awesome-icon icon="pen" />
            </b-button>
            <b-button
              v-if="permissions.includes('our_branch_delete')"
              class="rounded-circle p-2 me-2"
              @click="deleteBranch(data.item.id)"
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
            v-on:click="getBranches"
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
import { useAboutBranchStore } from "../../stores/admin/branchStore.js";
const {
  branches,
  fields,
  options,
  perPage,
  currentPage,
  rows,
  branch,
  isBusy,
  modal,
} = storeToRefs(useAboutBranchStore());

const {
  getBranches,
  setPerPage,
  hideModel,
  editBranch,
  deleteBranch,
  updateBranch,
} = useAboutBranchStore();
const { permissions } = storeToRefs(useLoginStore());
getBranches();
</script>
