<template>
  <b-row>
    <b-card>
      <b-col>
        <b-row align-v="center">
          <b-col><h5>Users List</h5></b-col>
          <b-col>
            <b-button
              v-if="permissions.includes('user_add')"
              @click="modal = !modal"
              class="float-end"
              pill
              variant="outline-dark"
            >
              <font-awesome-icon icon="plus" class="me-2" />Add User</b-button
            >
            <div>
              <b-modal
                v-model="modal"
                :title="user.id ? 'Update User' : 'Add User'"
                hide-header-close
                no-close-on-backdrop
              >
                <b-form-group
                  id="input-group-1"
                  label="Email address:"
                  label-for="input-1"
                  description="We'll never share your email with anyone else."
                >
                  <b-form-input
                    id="input-1"
                    v-model="user.email"
                    type="email"
                    placeholder="Enter email"
                    required
                  ></b-form-input>
                  <b-form-invalid-feedback v-if="errors.email" :state="errors.email">
                    {{ errors.email[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                  <b-form-input
                    id="input-2"
                    v-model="user.name"
                    placeholder="Enter name"
                    required
                  ></b-form-input>
                  <b-form-invalid-feedback v-if="errors.name" :state="errors.name">
                    {{ errors.name[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group id="input-group-3" label="Password:" label-for="input-3">
                  <b-form-input
                    id="input-3"
                    type="password"
                    v-model="user.password"
                    placeholder="Enter  Password"
                    required
                  ></b-form-input>
                  <b-form-invalid-feedback
                    v-if="errors.password"
                    :state="errors.password"
                  >
                    {{ errors.password[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                  id="input-group-4"
                  label="Confirm Password:"
                  label-for="input-4"
                >
                  <b-form-input
                    id="input-4"
                    type="password"
                    v-model="user.password_confirmation"
                    placeholder="Enter Confirm Password"
                    required
                  ></b-form-input>
                  <b-form-invalid-feedback
                    v-if="errors.password_confirmation"
                    :state="errors.password_confirmation"
                  >
                    {{ errors.password_confirmation[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>

                <template #footer>
                  <div>
                    <button class="btn btn-outline-dark" @click="hideModel">Close</button>
                  </div>
                  <div>
                    <button class="btn btn-outline-primary" @click="uploadData">
                      {{ user.id ? "Update User" : "Add User" }}
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
          outlined
          empty-filtered-text
          caption-top
          hover
          footClone
          :items="users"
          :fields="fields"
          :busy="isBusy"
          responsive
          show-empty
        >
          <template #cell(created_at)="data">{{ dateTime(data.value) }}</template>

          <template #cell(roles)="data">
            <b-badge
              v-for="(roles, index) in data.item.roles"
              :key="index"
              pill
              class="me-2"
              >{{ roles.name }}</b-badge
            >
          </template>
          <template #cell(actions)="data">
            <!--  -->
            <b-button
              v-if="permissions.includes('user_edit')"
              class="rounded-circle p-2 me-2"
              @click="editUser(data.item.id)"
              variant="outline-success"
            >
              <font-awesome-icon icon="pen" />
            </b-button>

            <b-button
              v-if="!data.item.deleted_at && permissions.includes('user_delete')"
              class="rounded-circle p-2 me-2"
              @click="recycleUser(data.item.id)"
              variant="outline-secondary"
            >
              <font-awesome-icon icon="recycle" />
            </b-button>

            <b-button
              v-if="data.item.deleted_at && permissions.includes('user_restore')"
              class="rounded-circle p-2 me-2"
              @click="restoreUser(data.item.id)"
              variant="outline-primary"
            >
              <font-awesome-icon icon="arrow-rotate-left" />
            </b-button>
            <b-button
              v-if="permissions.includes('user_forceDelete')"
              class="rounded-circle p-2 me-2"
              @click="deleteUser(data.item.id)"
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
            v-on:click="getUsers"
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
import { useUsersStore } from "../../stores/admin/usersStore.js";
import { useLoginStore } from "../../stores/admin/loginStore.js";
const {
  users,
  user,
  fields,
  options,
  perPage,
  currentPage,
  modal,
  rows,
  isBusy,
  errors,
} = storeToRefs(useUsersStore());

const { permissions } = storeToRefs(useLoginStore());
const {
  getUsers,
  setPerPage,
  dateTime,
  uploadData,
  editUser,
  recycleUser,
  deleteUser,
  restoreUser,

  hideModel,
} = useUsersStore();

getUsers();
</script>
