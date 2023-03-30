<template>
  <b-row>
    <b-card>
      <b-col>
        <b-row align-v="center">
          <b-col><h5>Permissions List</h5></b-col>
          <b-col>
            <b-button
              v-if="permissions.includes('permission_add')"
              @click="
                modal = !modal;
                getallRoles();
              "
              class="float-end"
              pill
              variant="outline-dark"
            >
              <font-awesome-icon icon="plus" class="me-2" />Add Permission</b-button
            >
            <div>
              <b-modal
                v-model="modal"
                :title="permission.id ? 'Update Permission' : 'Add Permission'"
                hide-header-close
                no-close-on-backdrop
              >
                <b-form-group
                  id="input-group-1"
                  label="Permission Name:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    v-model="permission.name"
                    type="text"
                    placeholder="Enter Permission Name (Eg: Users View , User Edit)"
                  ></b-form-input>
                  <b-form-invalid-feedback
                    v-if="errors.permission_name"
                    :state="errors.permission_name"
                  >
                    {{ errors.permission_name[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group>
                  <template #label>
                    <span class="my-2"> <b>Select Roles :</b></span>
                    <b-form-checkbox
                      v-model="allSelected"
                      :indeterminate="indeterminate"
                      aria-describedby="roles"
                      aria-controls="roles"
                      @change="toggleAll"
                    >
                      {{ allSelected ? "Un-select All" : "Select All" }}
                    </b-form-checkbox>
                  </template>

                  <template v-slot="{ ariaDescribedby }">
                    <b-form-checkbox-group
                      id="roles"
                      v-model="selected"
                      :options="roles"
                      :aria-describedby="ariaDescribedby"
                      name="roles"
                      switches
                    ></b-form-checkbox-group>
                  </template>
                </b-form-group>
                <b-form-invalid-feedback v-if="errors.roles" :state="errors.roles">
                  {{ errors.roles[0] }}
                </b-form-invalid-feedback>

                <template #footer>
                  <div>
                    <button class="btn btn-outline-dark" @click="hideModel">Close</button>
                  </div>
                  <div>
                    <button class="btn btn-outline-primary" @click="uploadData">
                      {{ permission.id ? "Update Permission" : "Add Permission" }}
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
          footClone
          :items="allpermissions"
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
              :variant="badgeVarients[Math.floor(Math.random() * badgeVarients.length)]"
              class="me-2"
              >{{ roles.name }}</b-badge
            >
          </template>
          <template #cell(actions)="data">
            <!--  -->
            <b-button
              v-if="permissions.includes('permission_edit')"
              class="rounded-circle p-2 me-2"
              @click="editPermission(data.item.id)"
              variant="outline-success"
            >
              <font-awesome-icon icon="pen" />
            </b-button>
            <b-button
              v-if="permissions.includes('permission_delete')"
              class="rounded-circle p-2 me-2"
              @click="deletePermission(data.item.id)"
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
            v-on:click="getPermissions"
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
import { watch } from "vue";
import { storeToRefs } from "pinia";
import { usePermissionsStore } from "../../../stores/admin/UsersComponents/permissionsStore";
import { useLoginStore } from "../../../stores/admin/loginStore";
const {
  allpermissions,
  permission,
  fields,
  options,
  perPage,
  currentPage,
  modal,
  rows,
  isBusy,
  errors,
  badgeVarients,
  roles,
  selected,
  allSelected,
  indeterminate,
} = storeToRefs(usePermissionsStore());

const { permissions } = storeToRefs(useLoginStore());
const {
  getPermissions,
  setPerPage,
  dateTime,
  uploadData,
  editPermission,
  deletePermission,
  hideModel,
  getallRoles,
  toggleAll,
} = usePermissionsStore();
getPermissions();

watch(selected, (newValue, oldValue) => {
  if (newValue.length === 0) {
    usePermissionsStore().indeterminate = false;
    usePermissionsStore().allSelected = false;
  } else if (newValue.length === usePermissionsStore().roles.length) {
    usePermissionsStore().indeterminate = false;
    usePermissionsStore().allSelected = true;
  } else {
    usePermissionsStore().indeterminate = true;
    usePermissionsStore().allSelected = false;
  }
});
</script>
