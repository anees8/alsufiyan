import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment";
import router from "../../../router.js";

export const usePermissionsStore = defineStore("permissionsStore", {
    state: () => ({
        fields: [
            { key: "id", label: "ID" },
            { key: "name" , label: "Name" },
            { key: "slug", label: "Slug"  },
            { key: "roles" , label: "Roles" },
            
            { key: "actions", label: "Action" },
        ],
        allpermissions: [],
        permission: {},
        roles:[],
        perPage: 10,
        currentPage: 1,
        isBusy: false,
        rows: null,
        modal: false,
        badgeVarients: [
            // "primary",
            // "secondary",
            // "success",
        //  "info",
            // "danger",
            "warning",
            // "dark",
        ],
        options: [
            { value: 5, text: "5" },
            { value: 10, text: "10" },
            { value: 50, text: "50" },
            { value: 100, text: "100" },
        ],

        errors: {},
        selected: [],
        allSelected: false,
        indeterminate: false,
    }),

    actions: {
        toggleAll(checked) {
            this.selected = checked ? this.roles.map((a) => a.value) : [];
        },
        async getPermissions() {
            this.isBusy = true;
            try {
                let url = "permissions";
                url += `?dashboard`;
                if (this.perPage) {
                    url += `&perPage=${this.perPage}`;
                }
                if (this.currentPage > 1) {
                    url += `&page=${this.currentPage}`;
                }
                const response = await axios.get(url);
                this.allpermissions = response.data.data.permissions.data;
                this.currentPage = response.data.data.permissions.current_page;
                this.rows = response.data.data.permissions.total;
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

        async getallRoles() {
            try {
                let url = "roles";

                const response = await axios.get(url);

                this.roles = response.data.data.roles;
                
            } catch (error) {
                if (error.response.status === 403) {
                    router.push({ name: "NotAuthorize" });
                } else if (error.response.status === 400) {
                    if (error.response) {
                        this.errors = error.response.data.errors;
                    }
                }
            }
        },
      async  editPermission(id) {

            this.loading = true;
            try {
                const response = await axios.get("permissions/" + id);
                this.permission = response.data.data.permission;
                this.selected = response.data.data.permission.roles.map(
                    (a) => a.id
                );
                this.getallRoles();
                this.modal = !this.modal;
            } catch (error) {
                this.role = {};
                router.push({ name: "AdminRolesPermissions" });
            }
           
           
        },
        deletePermission(id) {
            Swal.fire({
                title: "Are you sure?",
                text: "Do you want to Delete Permanently this Permission : " + id,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, Delete",
                cancelButtonText: "No, cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    let url = "permissions/";

                    axios
                        .delete(url + id)
                        .then((res) => {
                            
                            this.getPermissions();
                            Swal.fire(
                                "Deleted!",
                                "Permission has been deleted.",
                                "success"
                            );
                        })
                        .catch((error) => {
                            this.errors = error.response.data.errors;
                            setTimeout(() => {
                                this.errors = {};
                            }, 5000);
                        });
                }
            });
        },
  
        dateTime(value) {
            return moment(value).format("D-MMM-Y");
        },

        setPerPage(value) {
            this.perPage = value;
            this.currentPage = 1;
            this.getPermissions();
        },

        resetForm() {
            this.selected =[];
            this.errors = {};
            this.permission = {};
            this.roles=[];
            this.loading = false;
        },
        hideModel() {
            this.modal = !this.modal;
            this.getPermissions();
            this.resetForm();
        },

        async uploadData() {
            const formData = new FormData();
            let config = {
                header: { "content-type": "multipart/form-data" },
            };
            this.loading = true;
            let url = "permissions";
            if (this.permission.name) {
                formData.append("permission_name", this.permission.name);
            }

            if (this.selected) {
                Object.keys(this.selected).forEach((e) => {
                    formData.append(`roles[${e}]`, this.selected[e]);
                });
            }
           

            if (!this.permission.id) {
                try {
                    const response = await axios.post(url, formData, config);

                    this.hideModel();
                } catch (error) {
                    if (error.response.status === 403) {
                        router.push({ name: "NotAuthorize" });
                    } else if (error.response.status === 400) {
                        if (error.response) {
                            this.errors = error.response.data.errors;
                        }
                    }

                    this.loading = false;
                    setTimeout(() => {
                        this.errors = {};
                    }, 5000);
                }
            } else {
                formData.append("_method", "put");
                try {
                    const response = await axios.post(
                        url + "/" + this.permission.id,
                        formData,
                        config
                    );

                    this.hideModel();
                } catch (error) {
                    if (error.response) {
                        if (error.response.status === 403) {
                            router.push({ name: "NotAuthorize" });
                        } else if (error.response.status === 400) {
                            if (error.response.status === 403) {
                                router.push({ name: "NotAuthorize" });
                            } else if (error.response.status === 400) {
                                this.errors = error.response.data.errors;
                            }
                           
                        }
                        setTimeout(() => {
                            this.errors = {};
                        }, 5000);
                    }
                }
            }
        },
    },
});
