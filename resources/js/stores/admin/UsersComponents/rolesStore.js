import { defineStore } from "pinia";
import axios from "axios";
import router from "../../../router.js";
import { useLoginStore } from "../loginStore.js";

const {  refreshUserPermissions } = useLoginStore();
export const useRolesStore = defineStore("rolesStore", {
    state: () => ({
        fields: [
            { key: "id", label: "ID"  },
            { key: "name", label: "Name" , thStyle: { width: "10%" } },
            { key: "permissions" , label: "Permissions" },
            { key: "actions", label: "Actions" , thStyle: { width: "8%" } },
        ],
        roles: [],
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
        badgeVarients: [
            // "primary",
            // "secondary",
            // "success",
        //  "info",
            // "danger",
            "warning",
            // "dark",
        ],
        role: {},
        permissions: [],
        loading: false,
        selected: [],
        allSelected: false,
        indeterminate: false,
        errors: {},
    }),

    actions: {
        toggleAll(checked) {
            this.selected = checked ? this.permissions.map((a) => a.value) : [];
        },
        async getRolesPermission() {
            this.isBusy = true;
            try {
                let url = "roles";

                url += `?permissions`;
                if (this.perPage) {
                    url += `&perPage=${this.perPage}`;
                }
                if (this.currentPage > 1) {
                    url += `&page=${this.currentPage}`;
                }
                const response = await axios.get(url);
                this.roles = response.data.data.roles.data;
                this.currentPage = response.data.data.roles.current_page;
                this.rows = response.data.data.roles.total;

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
        async getRole(id) {
            this.loading = true;
            try {
                const response = await axios.get("roles/" + id);
                this.role = response.data.data.role;
                this.selected = response.data.data.role.permissions.map(
                    (a) => a.id
                );
            } catch (error) {
                this.role = {};
                router.push({ name: "AdminRolesPermissions" });
            }
        },

        async getallPermission() {
            try {
                let url = "permissions";

                    
                const response = await axios.get(url);

                this.permissions = response.data.data.permissions;
              
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 403) {
                        router.push({ name: "NotAuthorize" });
                    } else if (error.response.status === 400) {
                            this.errors = error.response.data.errors;
                    }
                }
                this.loading = false;
              
                setTimeout(() => {
                    this.errors = {};
                }, 5000);
            }
        },

        deleteRoles(id) {
            Swal.fire({
                title: "Are you sure?",
                text: "Do you want to Delete Permanently this Role : " + id,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, Delete",
                cancelButtonText: "No, cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    let url = "roles/";

                    axios
                        .delete(url + id)
                        .then((res) => {

                            this.getRolesPermission();
                            refreshUserPermissions();
                            Swal.fire(
                                "Deleted!",
                                "Role has been deleted.",
                                "success"
                            );
                        })
                        .catch((error) => {
                            if (error.response) {
                                if (error.response.status === 403) {
                                    router.push({ name: "NotAuthorize" });
                                } else if (error.response.status === 400) {
                                        this.errors = error.response.data.errors;
                                }
                            }
                            this.loading = false;
                          
                            setTimeout(() => {
                                this.errors = {};
                            }, 5000);
                          
                        });
                }
            });
        },

        async onPermissionSubmit() {
            const formData = new FormData();
            let config = {
                header: {
                    "content-type": "multipart/form-data",
                },
            };
            this.loading = true;
            let url = "roles";

            if (this.role.name) {
                formData.append("role_name", this.role.name);
            }
            if (this.selected) {
                Object.keys(this.selected).forEach((e) => {
                    formData.append(`permission[${e}]`, this.selected[e]);
                });
            }

            if (!this.role.id) {
                try {
                    const response = await axios.post(url, formData, config);
                    router.push({ name: "AdminRolesPermissions" });
                } catch (error) {
                    if (error.response) {
                        if (error.response.status === 403) {
                            router.push({ name: "NotAuthorize" });
                        } else if (error.response.status === 400) {
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
                        url + "/" + this.role.id,
                        formData,
                        config
                    );
                    router.push({ name: "AdminRolesPermissions" });

                   
                } catch (error) {
                    if (error.response) {
                        if (error.response.status === 403) {
                            router.push({ name: "NotAuthorize" });
                        } else if (error.response.status === 400) {
                                this.errors = error.response.data.errors;
                        }
                    }
                    this.loading = false;
                  
                    setTimeout(() => {
                        this.errors = {};
                    }, 5000);
                }
            }
            refreshUserPermissions();

        },
        resetRole() {
            this.role = {};

            this.selected = [];
            this.allSelected = false;
            this.indeterminate = false;
        },
        setPerPage(value) {
            this.perPage = value;
            this.currentPage = 1;
            this.getRolesPermission();
        },
    },
});
