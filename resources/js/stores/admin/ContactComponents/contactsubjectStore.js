import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment";

export const useContactSubjectsStore = defineStore("contactsubjectsStore", {
state: () => ({
                fields: [
                { key: "id", label: "ID" },
                { key: "subject", label: "Subject" },
                { key: "created_at", label: "Created Date" },
                { key: "actions", label: "Action" },
                ],
                subjects: [],
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

                loading:false,
                modal: false,  
                subject:{
                    edit_id:null,
                 },
                
                errors: {},
    }),

actions: {
    async getContactSubject() {
                this.isBusy = true;
                try {
                let url = "contactsubjects";
                if (this.perPage) {
                url += `?perPage=${this.perPage}`;
                }
                if (this.currentPage > 1) {
                url += `${this.perPage ? "&" : "?"}page=${
                this.currentPage
                }`;
                }
                const response = await axios.get(url);
                this.subjects = response.data.data.subject.data;

                this.currentPage = response.data.data.subject.current_page;
                this.rows = response.data.data.subject.total;

                this.isBusy = false;
                } catch (error) {
                if (error.response) {
                this.errors = error.response.data.errors;
                }
                this.isBusy = false;
                }
    }, 

    async uploadData() {
    
        if(!this.subject.id){
           
        const formData = new FormData();
        if(this.subject.subject){
        formData.append('subject',this.subject.subject);
        }
       
        this.loading = true;
    
        try {
        let url = "contactsubjects";
        const response = await axios.post(url,formData);
        
        this.getContactSubject();
        this.hideModel();
        } catch (error) {
         
        if (error.response) {
        this.errors = error.response.data.errors;
        }
        this.loading = false;
        }
         }else{
           
        this.loading = true;
        try {
           
        let url = "contactsubjects/";
        const formData = new FormData();
        if(this.subject.subject){
            formData.append('subject',this.subject.subject);
        }
    
        formData.append('_method','put');
       
        const response = await axios.post(url+this.subject.id,formData);
      
        this.getContactSubject();
        this.hideModel();

        } catch (error) {
        if (error.response) {
        this.errors = error.response.data.errors;
        }
        this.loading = false;

        }

         }
},


    dateTime(value) {
         return moment(value).format("D-MMM-Y");
    },

    setPerPage(value) {
        this.perPage = value;
        this.currentPage = 1;
        this.getContactSubject();
    },
    
    editContactSubject(id){
    this.subject =this.subjects.find(subject=>subject.id==id);
    if(this.subject){
    this.modal = !this.modal;
    }


    }, 
    
    
    deleteContactSubject(id){
        Swal.fire({
        title: 'Are you sure?',
        text:  "Do you want to Delete this Contact Subject : " + id,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: 'Yes, delete',
        cancelButtonText: 'No, cancel'
        }).then((result) => {
        if (result.isConfirmed) {

        let url = "contactsubjects/";

        axios
        .delete(url+id)
        .then((res) => {
        this.getContactSubject();
        Swal.fire("Deleted!", "Your Contact Subject has been deleted.", "success");
        })
        .catch((error) => {
        this.errors = error.response.data.errors;
        });
        }
        });

},


        resetForm(){
        this.errors = {};
        this.loading = false;
        },

        hideModel(){
        this.modal = !this.modal;
        this.subject={
            edit_id:null,
            },
      
        this.resetForm();
        },


    },
    });
