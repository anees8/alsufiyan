<template>
  <b-row>
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
  </b-row>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useRolesStore } from "../../../stores/admin/UsersComponents/rolesStore.js";
const { roles, fields, isBusy, perPage, currentPage, rows, badgeVarients } = storeToRefs(
  useRolesStore()
);
const { getRolesPermission, setPerPage, editRoles, deleteRoles } = useRolesStore();
getRolesPermission();
</script>
