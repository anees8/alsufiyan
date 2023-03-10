import { defineStore } from "pinia";
import axios from "axios";


export const useCountersStore = defineStore("countersStore", {


state: () => ({
inquiry:0,
satisfy:0,
team:0, 
serviceYear:0,

}),

actions: {

getExperiance(){
const dateString = "20-11-2001";
const [day, month, year] = dateString.split("-");
const date = new Date(year, month - 1, day);
const date2 = new Date();
const diffYears = date2.getFullYear() - date.getFullYear();
this.serviceYear=diffYears;

}

},
});
