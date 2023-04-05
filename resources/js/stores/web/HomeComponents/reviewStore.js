import { defineStore } from "pinia";
import axios from "axios";

export const useReviewsStore = defineStore("reviewsStore", {
    state: () => ({
        reviews: [{'comment':"One of te best travels in mysore most comfortable experience with complete support guidance from Bangalore Airport to ruten Bangalore thanks again for your travels","user":"Rizwan Ahmed",'rating':3.75},{'comment':"One of te best travels in mysore most comfortable experience with complete support guidance from Bangalore Airport to ruten Bangalore thanks again for your travels","user":"Saniya",'rating':2.75}],
        loading: false,
        
    }),

   
});
