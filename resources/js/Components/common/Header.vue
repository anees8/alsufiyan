<template>
  <div style="height: 4rem" class="bg-light">
    <b-container fluid
      ><b-row>
        <b-col>
          <button class="btn btn-dark rounded p-2 float-end my-2">
            {{ timer }}
          </button>
        </b-col>
      </b-row></b-container
    >
  </div>
  <hr class="m-0" />
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useLoginStore } from "../../stores/admin/loginStore";
const { timer } = storeToRefs(useLoginStore());
</script>
