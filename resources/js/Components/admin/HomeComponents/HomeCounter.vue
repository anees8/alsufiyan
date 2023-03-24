<template>
  <div>
    <b-container fluid class="text-center text-uppercase">
      <b-modal
        v-model="modal"
        title="Edit Counter"
        hide-header-close
        no-close-on-backdrop
      >
        <b-form-group id="input-group-1" label="Counter:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="counter.counter"
            type="number"
            placeholder="0000"
            required
          ></b-form-input>
          <b-form-invalid-feedback v-if="errors.counter" :state="errors.counter">
            {{ errors.counter[0] }}
          </b-form-invalid-feedback>
        </b-form-group>

        <template #footer>
          <div>
            <button class="btn btn-outline-dark" @click="hideModel">Close</button>
          </div>
          <div>
            <button class="btn btn-outline-primary" @click="updateCounter">
              Update Home Counter
            </button>
          </div>
        </template>
      </b-modal>
      <b-row
        ><b-col
          cols="12"
          class="my-2 col-lg-3 col-md-6 col-sm-12"
          v-for="(count, index) in counters"
          :key="index"
          ><b-card class="h-100 position-relative">
            <b-button
              class="position-absolute top-0 end-0"
              @click="editHomeCounter(count.id)"
              variant="success"
            >
              <font-awesome-icon icon="pen" />
            </b-button>

            <number
              :from="0"
              :to="count.counter"
              :duration="3"
              class="h1"
              easing="Power1.easeOut"
            />

            <hr class="mx-5" />
            <h5>{{ count.counter_name }}</h5>
          </b-card>
        </b-col></b-row
      >
    </b-container>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useAdminCountersStore } from "../../../stores/admin/HomeComponents/counterStore";
const { counters, counter, modal, errors } = storeToRefs(useAdminCountersStore());
const { getCounter, editHomeCounter, hideModel, updateCounter } = useAdminCountersStore();
getCounter();
</script>
