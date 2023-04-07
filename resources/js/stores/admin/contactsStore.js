import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment";
import router from "../../router.js";

export const useContactsStore = defineStore("contactsStore", {
    state: () => ({
        fields: [
            { key: "id", label: "ID" },
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" },
            { key: "subject", label: "Subject", thStyle: { width: "15%" } },
            { key: "message", label: "Message", thStyle: { width: "30%" } },
            { key: "created_at", label: "Created Date" },
            { key: "status", label: "Status"},
            { key: "actions", label: "Action" ,thStyle: { width: "10%" }},
        ],
        contacts: [],
        
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
        statusloading:false,
        status_id:null,
        statusOption:[ 
       
      ],
        message:null,
        errors: {},
    }),

    actions: {
        async getContacts() {
            this.isBusy = true;
            try {
                let url = "contacts";
                url += `?permission`;
                if (this.perPage) {
                    url += `&perPage=${this.perPage}`;
                }
                if (this.currentPage > 1) {
                    url += `&page=${this.currentPage}`;
                }
                const response = await axios.get(url);
                this.contacts = response.data.data.contacts.data;
                this.statusOption=response.data.data.status
                this.currentPage = response.data.data.contacts.current_page;
                this.rows = response.data.data.contacts.total;

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

       async changeStatus(item){
      
                this.statusloading=true;

                   

                try{
                    let url = "contacts";

                    const formData = new FormData();
                    formData.append("_method", "put");
                    
                if(item.status_id){
                    formData.append("status_id", item.status_id);
                }
                
                let config = {
                        header: { "Content-Type": "multipart/form-data" },
                    };
                    const response = await axios.post(
                        url+'/'+item.id,
                        formData,
                        config
                    );  
                        this.getContacts();
                        this.message=response.data.message
                    setTimeout(() => {
                        this.statusloading=false;
                        this.message="";
                       
                    }, 1000);
                    

                }catch(error){
                    if (error.response) {
                        if (error.response.status === 403) {
                            router.push({ name: "NotAuthorize" });
                        } else if (error.response.status === 400) {
                                this.errors = error.response.data.errors;
                        }
                }

                setTimeout(() => {
                    this.errors = {};
                   
                }, 5000);
                this.statusloading=false;
               
            }

       

        
       },

        dateTime(value) {
            return value?moment(value).format("D-MMM-Y"):null;
        },

        setPerPage(value) {
            this.perPage = value;
            this.currentPage = 1;
            this.getContacts();
        },
    },
});
