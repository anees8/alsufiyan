<template>
  <b-container class="bg-dark text-center text-uppercase" fluid>
    <b-container class="py-5">
      <b-row v-if="loading">

        <b-col cols="12" class="my-2 col-lg-3 col-md-6  col-sm-12"
        v-for="count in 4"
        :key="count">  

        <b-card class="shadow-lg h-100   ">
          <div  class="d-flex justify-content-center">
           <b-skeleton animation="fade" width="20%" style="height:50px"></b-skeleton>
          </div>

            <hr class="mx-5" />
            <div  class="d-flex justify-content-center">
            <b-skeleton animation="fade" width="80%" style="height:30px"></b-skeleton>
            </div>

        </b-card>
</b-col>

      </b-row>
    <b-row v-else
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
const { counters,loading } = storeToRefs(useCountersStore());
const {getCounter} = useCountersStore();
getCounter();
</script>
