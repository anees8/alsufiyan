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
              <b-form-group id="input-group-2" label="Branch City:" label-for="input-2">
                <b-input-group class="mt-1">
                  <template #prepend>
                    <b-input-group-text
                      ><font-awesome-icon icon="code-branch" />
                    </b-input-group-text>
                  </template>
                  <b-form-input
                    id="input-2"
                    v-model="branch.location"
                    placeholder="Enter Branch Location"
                  ></b-form-input>
                </b-input-group>
                <b-form-invalid-feedback v-if="errors.location" :state="errors.location">
                  {{ errors.location[0] }}
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group id="input-group-2" label="Image:" label-for="input-2">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  class="form-control"
                  v-on:change="onFileChange"
                />
                <b-img
                  loading="lazy"
                  v-if="branch.previewImage"
                  :src="branch.previewImage"
                  class="mt-2"
                  style="height: auto; width: auto; max-height: 150px; max-width: 450px"
                  rounded
                ></b-img>
                <b-form-invalid-feedback v-if="errors.image" :state="errors.image">
                  {{ errors.image[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group
                id="input-group-2"
                label="Branch Address:"
                label-for="input-2"
              >
                <b-input-group class="mt-1">
                  <template #prepend>
                    <b-input-group-text
                      ><font-awesome-icon icon="location-dot" />
                    </b-input-group-text>
                  </template>
                  <b-form-input
                    id="input-2"
                    v-model="branch.address"
                    placeholder="Enter Branch Address"
                  ></b-form-input>
                </b-input-group>
                <b-form-invalid-feedback v-if="errors.address" :state="errors.address">
                  {{ errors.address[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group id="input-group-2" label="Map Link:" label-for="input-2">
                <b-input-group class="mt-1">
                  <template #prepend>
                    <b-input-group-text
                      ><font-awesome-icon icon="map" />
                    </b-input-group-text>
                  </template>
                  <b-form-input
                    id="input-2"
                    v-model="branch.map"
                    placeholder="Enter Branch Map link"
                  ></b-form-input>
                </b-input-group>
                <b-form-invalid-feedback v-if="errors.map" :state="errors.map">
                  {{ errors.map[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group
                id="input-group-2"
                label="Contact Person:"
                label-for="input-2"
              >
                <b-input-group class="mt-1">
                  <template #prepend>
                    <b-input-group-text
                      ><font-awesome-icon icon="fa-regular fa-user" />
                    </b-input-group-text>
                  </template>
                  <b-form-input
                    id="input-2"
                    v-model="branch.person"
                    placeholder="Enter Contact Person Name"
                  ></b-form-input>
                </b-input-group>
                <b-form-invalid-feedback v-if="errors.person" :state="errors.person">
                  {{ errors.person[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group
                id="input-group-2"
                label="Primary Phone Number:"
                label-for="input-2"
              >
                <b-input-group class="mt-1">
                  <template #prepend>
                    <b-input-group-text
                      ><font-awesome-icon icon="mobile-screen" />
                    </b-input-group-text>
                  </template>
                  <b-form-input
                    id="input-2"
                    v-model="branch.phone"
                    placeholder="Enter Primary Phone Number"
                  ></b-form-input>
                </b-input-group>
                <b-form-invalid-feedback v-if="errors.phone" :state="errors.phone">
                  {{ errors.phone[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group
                id="input-group-2"
                label="Contact Secondary Person:"
                label-for="input-2"
              >
                <b-input-group class="mt-1">
                  <template #prepend>
                    <b-input-group-text
                      ><font-awesome-icon icon="fa-regular fa-user" />
                    </b-input-group-text>
                  </template>
                  <b-form-input
                    id="input-2"
                    v-model="branch.secondary_person"
                    placeholder="Enter Contact Secondary Person Name"
                  ></b-form-input>
                </b-input-group>
                <b-form-invalid-feedback
                  v-if="errors.secondary_person"
                  :state="errors.secondary_person"
                >
                  {{ errors.secondary_person[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group
                id="input-group-2"
                label="Secondary Phone Number:"
                label-for="input-2"
              >
                <b-input-group class="mt-1">
                  <template #prepend>
                    <b-input-group-text
                      ><font-awesome-icon icon="mobile-screen" />
                    </b-input-group-text>
                  </template>
                  <b-form-input
                    id="input-2"
                    v-model="branch.secondary_phone"
                    placeholder="Enter Secondary Phone Number"
                  ></b-form-input>
                </b-input-group>
                <b-form-invalid-feedback
                  v-if="errors.secondary_phone"
                  :state="errors.secondary_phone"
                >
                  {{ errors.secondary_phone[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
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
import { useLoginStore } from "../../../stores/admin/loginStore.js";
import { useAboutBranchStore } from "../../../stores/admin/branchStore.js";
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
  errors,
} = storeToRefs(useAboutBranchStore());

const {
  getBranches,
  setPerPage,
  hideModel,
  editBranch,
  deleteBranch,
  updateBranch,
  onFileChange,
} = useAboutBranchStore();
const { permissions } = storeToRefs(useLoginStore());
getBranches();
</script>
