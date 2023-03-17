<template>
<b-container class="my-3">
    <b-row >
        <b-col cols="12" md="3" >
            <b-card class="align-items-center">
                <b-img   rounded="circle" v-bind="mainProps"></b-img>
            </b-card>
           
        </b-col>
        <b-col cols="12" md="3">
            <b-card class="align-items-center">
                <b-img  rounded="circle" v-bind="mainProps"></b-img>
            </b-card>
           
        </b-col>
        <b-col cols="12" md="3">
            <b-card class="align-items-center">
                <b-img  rounded="circle" v-bind="mainProps"></b-img>
            </b-card>
           
        </b-col>
        <b-col cols="12" md="3">
            <b-card class="align-items-center">
                <b-img  rounded="circle" v-bind="mainProps"></b-img>
            </b-card>
           
        </b-col>
    </b-row>
</b-container>

</template>
<script setup>
  
    const mainProps= { src:"https://picsum.photos/125/125/?image=58",blank: true, blankColor: '#777', width: 75, height: 75, class: 'm1' }
    
</script>