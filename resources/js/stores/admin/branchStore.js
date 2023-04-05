import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment";

export const useAboutBranchStore = defineStore("aboutbranchStore", {
    state: () => ({
        branches:[],
        fields: [
            { key: "id", label: "ID" },
            { key: "location", label: "Location" },      
          
            { key: "actions", label: "Action" },
        ],
      
        perPage: 5,
        currentPage: 1,
        isBusy: false,
        rows: null,
        options: [
            { value: 5, text: "5" },
            { value: 10, text: "10" },
            { value: 50, text: "50" },
            { value: 100, text: "100" },
        ],

        errors: {},


    }),

    actions: {
       async getBranches(){
            this.isBusy = true;
            try {
                let url = "ourbranchs";
                url += `?permission`;
                if (this.perPage) {
                    url += `&perPage=${this.perPage}`;
                }
                if (this.currentPage > 1) {
                    url += `&page=${this.currentPage}`;
                }
                const response = await axios.get(url);
                this.branches = response.data.data.branches.data;

                this.currentPage = response.data.data.branches.current_page;
                this.rows = response.data.data.branches.total;

                this.isBusy = false;
            } catch (error) {
                             if (error.response) {
                    if (error.response.status === 403) {
                        router.push({ name: "NotAuthorize" });
                    } else if (error.response.status === 400) {
                            this.errors = error.response.data.errors;
                    }
                }
                this.isBusy = false;
              
                setTimeout(() => {
                    this.errors = {};
                }, 5000);
            }
        

        },
        dateTime(value) {
            
            return value?moment(value).format("D-MMM-Y"):null;
        },
        setPerPage(value) {
            this.perPage = value;
            this.currentPage = 1;
            this.getBranches();
        },

    }
    
    
});
