<template>
  <b-row>
    <b-card>
      <b-row>
        <b-col cols="12" class="d-flex mb-3">
          <router-link class="nav-link" @click="$router.go(-1)" to=""
            ><font-awesome-icon icon="fa-solid fa-arrow-left" class="me-2"
          /></router-link>

          <b-breadcrumb class="ms-2">
            <b-breadcrumb-item class="nav-link" :to="{ name: 'Dashboard' }">
              Home</b-breadcrumb-item
            >
            <b-breadcrumb-item class="nav-link" :to="{ name: 'AdminRolesUsers' }">
              Role User</b-breadcrumb-item
            >
            <b-breadcrumb-item active>Role User Details</b-breadcrumb-item>
          </b-breadcrumb>
        </b-col>
      </b-row>

      <b-form @submit="onUsersSubmit">
        <b-form-group id="input-group-1" label="Role Name:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="role.name"
            type="text"
            placeholder="Enter Role Name"
          ></b-form-input>
          <b-form-invalid-feedback v-if="errors.role_name" :state="errors.role_name">
            {{ errors.role_name[0] }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group>
          <template #label>
            <span class="my-2"> <b>Select Permission :</b></span>
            <b-form-checkbox
              v-model="allSelected"
              :indeterminate="indeterminate"
              aria-describedby="users"
              aria-controls="users"
              @change="toggleAll"
            >
              {{ allSelected ? "Un-select All" : "Select All" }}
            </b-form-checkbox>
          </template>

          <template v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group
              id="permission"
              v-model="selected"
              :options="users"
              :aria-describedby="ariaDescribedby"
              name="permission"
              switches
            ></b-form-checkbox-group>
          </template>
        </b-form-group>
        <b-form-invalid-feedback v-if="errors.users" :state="errors.users">
          {{ errors.users[0] }}
        </b-form-invalid-feedback>

        <b-button type="submit" variant="dark">Users Role Update</b-button>
      </b-form>
    </b-card></b-row
  >
</template>
<script setup>
import { defineProps, watch } from "vue";
import { storeToRefs } from "pinia";
import { useUsersRolesStore } from "../../../../stores/admin/UsersComponents/usersroleStore.js";
const roleStore = useUsersRolesStore();
const props = defineProps({
  id: Number,
});

const { role, users, selected, allSelected, indeterminate, errors } = storeToRefs(
  useUsersRolesStore()
);
const {
  getRole,
  getallUsers,
  toggleAll,
  onUsersSubmit,
  resetRole,
} = useUsersRolesStore();
getallUsers();
props.id ? getRole(props.id) : resetRole();
watch(selected, (newValue, oldValue) => {
  if (newValue.length === 0) {
    roleStore.indeterminate = false;
    roleStore.allSelected = false;
  } else if (newValue.length === roleStore.users.length) {
    roleStore.indeterminate = false;
    roleStore.allSelected = true;
  } else {
    roleStore.indeterminate = true;
    roleStore.allSelected = false;
  }
});
</script>
