<template>
  <b-container class="bg-dark text-center text-uppercase" fluid>
    <b-container class="py-5">
      <h2 class="text-center fw-bolder text-light">
        <u></u>
      </h2>
      <b-row
        >
          
        
        <b-col cols="12" class="my-2 col-lg-3 col-md-6  col-sm-12"
        v-for="(count, index) in counters"
        :key="index"
          >  
          <b-card class="shadow-lg h-100" >
        
            <number
              :from="0"
              :to="count.counter"
              :duration="5"
              class="h1"
              easing="Power1.easeOut"
            />

            <hr class="mx-5" />
            <h5>{{count.counter_name}}</h5>
          </b-card>
          
          
          
           </b-col
        >
            
        
        </b-row 
      ></b-container
    >
  </b-container>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCountersStore } from "../../../stores/web/HomeComponents/counterStore";
const { counters } = storeToRefs(useCountersStore());
const {getCounter} = useCountersStore();
getCounter();
</script>
