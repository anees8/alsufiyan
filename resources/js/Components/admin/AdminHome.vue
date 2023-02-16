<template>
  <div class="sidebar">
    <Sidebar />

    <div class="content p-5">
      <b-card header="Carasoule Images" header-tag="header">
        <b-card-body class="p-0">
          <b-table striped hover :items="items" :fields="fields" bordered></b-table>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>
<script setup>
import Sidebar from "../common/Sidebar.vue";

const fields = ["first_name", "last_name", "age"];
const items = [
  { isActive: true, age: 40, first_name: "Dickerson", last_name: "Macdonald" },
  { isActive: false, age: 21, first_name: "Larsen", last_name: "Shaw" },
  { isActive: false, age: 89, first_name: "Geneva", last_name: "Wilson" },
  { isActive: true, age: 38, first_name: "Jami", last_name: "Carney" },
];
</script>
<style scoped>
.sidebar {
  display: flex;
}

.sidebar .content {
  flex: 1 1 0;
}
</style>
