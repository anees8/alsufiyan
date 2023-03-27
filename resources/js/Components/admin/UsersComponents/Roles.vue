<template>
  <b-row>
    <b-card>
      <b-col>
        <b-row align-v="center">
          <b-col><h5>Roles List</h5></b-col>
          <b-col>
            <b-button
              @click="modal = !modal"
              class="float-end"
              pill
              variant="outline-dark"
            >
              <font-awesome-icon icon="plus" class="me-2" />Add Role</b-button
            >
            <div>
              <b-modal
                v-model="modal"
                :title="role.id ? 'Update Role' : 'Add Role'"
                hide-header-close
                no-close-on-backdrop
              >
                <b-form-group id="input-group-1" label="Role Name:" label-for="input-1">
                  <b-form-input
                    id="input-1"
                    v-model="role.name"
                    type="text"
                    placeholder="Enter Role Name"
                    required
                  ></b-form-input>
                </b-form-group>

                <template #footer>
                  <div>
                    <button class="btn btn-outline-dark" @click="hideModel">Close</button>
                  </div>
                  <div>
                    <button class="btn btn-outline-primary" @click="uploadData">
                      {{ role.id ? "Update Role" : "Add Role" }}
                    </button>
                  </div>
                </template>
              </b-modal>
            </div></b-col
          >
        </b-row>
      </b-col>
      <b-col v-if="isBusy">
        <b-skeleton-table :rows="perPage" :columns="fields"></b-skeleton-table>
      </b-col>
      <b-col v-else>
        <b-table
          striped
          outlined
          empty-filtered-text
          caption-top
          hover
          :items="roles"
          :fields="fields"
          :busy="isBusy"
          responsive
          show-empty
        >
          <template #cell(permissions)="data">
            <b-badge
              v-for="(permission, index) in data.item.permissions"
              :key="index"
              pill
              :variant="badgeVarients[Math.floor(Math.random() * badgeVarients.length)]"
              class="me-2"
              >{{ permission.slug }}</b-badge
            >
          </template>

          <template #cell(actions)="data">
            <b-button
              class="rounded-circle p-2 me-2"
              @click="editRoles(data.item.id)"
              variant="outline-success"
            >
              <font-awesome-icon icon="pen" />
            </b-button>

            <b-button
              class="rounded-circle p-2 me-2"
              @click="deleteRoles(data.item.id)"
              variant="outline-danger"
            >
              <font-awesome-icon icon="fa-regular fa-trash-can" />
            </b-button>
          </template>
        </b-table>
      </b-col>
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
import { useRolesStore } from "../../../stores/admin/UsersComponents/rolesStore.js";
const {
  roles,
  role,
  fields,
  isBusy,
  perPage,
  currentPage,
  rows,
  badgeVarients,
  modal,
} = storeToRefs(useRolesStore());
const {
  getRolesPermission,
  setPerPage,
  editRoles,
  deleteRoles,
  hideModel,
  uploadData,
} = useRolesStore();
getRolesPermission();
</script>
