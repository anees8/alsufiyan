<template>
  <b-row>
    <b-card>
      <b-form @submit="onPermissionSubmit">
        <b-form-group id="input-group-1" label="Role Name:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="role.name"
            type="text"
            placeholder="Enter Role Name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group>
          <template #label>
            <span class="my-2"> <b>Select Permission :</b></span>
            <b-form-checkbox
              v-model="allSelected"
              :indeterminate="indeterminate"
              aria-describedby="permissions"
              aria-controls="permissions"
              @change="toggleAll"
            >
              {{ allSelected ? "Un-select All" : "Select All" }}
            </b-form-checkbox>
          </template>

          <template v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group
              id="flavors"
              v-model="selected"
              :options="permissions"
              :aria-describedby="ariaDescribedby"
              name="flavors"
              switches
            ></b-form-checkbox-group>
          </template>
        </b-form-group>
        <b-button type="submit" variant="outline-primary">Permission Update</b-button>
      </b-form>
    </b-card></b-row
  >
</template>
<script setup>
import { defineProps, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRolesStore } from "../../../../stores/admin/UsersComponents/rolesStore.js";
const roleStore = useRolesStore();
const props = defineProps({
  id: Number,
});

const { role, permissions, selected, allSelected, indeterminate } = storeToRefs(
  useRolesStore()
);
const { getRole, getallPermission, toggleAll, onPermissionSubmit } = useRolesStore();
getallPermission();
getRole(props.id);

watch(selected, (newValue, oldValue) => {
  if (newValue.length === 0) {
    roleStore.indeterminate = false;
    roleStore.allSelected = false;
  } else if (newValue.length === roleStore.permissions.length) {
    roleStore.indeterminate = false;
    roleStore.allSelected = true;
  } else {
    roleStore.indeterminate = true;
    roleStore.allSelected = false;
  }
});
</script>
