import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment";
import router from "../../../router.js";

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

        loading: false,
        modal: false,
        subject: {
            edit_id: null,
        },

        errors: {},
    }),

    actions: {
        async getContactSubject() {
            this.isBusy = true;
            try {
                let url = "contactsubjects";
                url += `?with_deleted`;
                if (this.perPage) {
                    url += `&perPage=${this.perPage}`;
                }
                if (this.currentPage > 1) {
                    url += `&page=${this.currentPage}`;
                }
                const response = await axios.get(url);
                this.subjects = response.data.data.subject.data;

                this.currentPage = response.data.data.subject.current_page;
                this.rows = response.data.data.subject.total;

                this.isBusy = false;
            } catch (error) {
                if (error.response.status === 403) {
                    router.push({ name: "NotAuthorize" });
                } else if (error.response.status === 400) {
                    if (error.response) {
                        this.errors = error.response.data.errors;
                    }
                }
                this.isBusy = false;
            }
            setTimeout(() => {
                this.errors = {};
            }, 5000);
        },

        async uploadData() {
            if (!this.subject.id) {
                const formData = new FormData();
                if (this.subject.subject) {
                    formData.append("subject", this.subject.subject);
                }

                this.loading = true;

                try {
                    let url = "contactsubjects";
                    const response = await axios.post(url, formData);

                    this.getContactSubject();
                    this.hideModel();
                } catch (error) {
                    if (error.response) {
                        this.errors = error.response.data.errors;
                    }
                    this.loading = false;
                    setTimeout(() => {
                        this.errors = {};
                    }, 5000);
                }
            } else {
                this.loading = true;
                try {
                    let url = "contactsubjects/";
                    const formData = new FormData();
                    if (this.subject.subject) {
                        formData.append("subject", this.subject.subject);
                    }

                    formData.append("_method", "put");

                    const response = await axios.post(
                        url + this.subject.id,
                        formData
                    );

                    this.getContactSubject();
                    this.hideModel();
                } catch (error) {
                    if (error.response) {
                        this.errors = error.response.data.errors;
                    }
                    this.loading = false;
                    setTimeout(() => {
                        this.errors = {};
                    }, 5000);
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

        editContactSubject(id) {
            this.subject = this.subjects.find((subject) => subject.id == id);
            if (this.subject) {
                this.modal = !this.modal;
            }
        },

        deleteContactSubject(id) {
            Swal.fire({
                title: "Are you sure?",
                text:
                    "Do you want to Delete Permanently this Contact Subject: " +
                    id,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, Delete",
                cancelButtonText: "No, cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    let url = "contactsubjects/forcedelete/";

                    axios
                        .get(url + id)
                        .then((res) => {
                            this.getContactSubject();
                            Swal.fire(
                                "Deleted!",
                                "Contact Subject has been deleted.",
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
        recycleContactSubject(id) {
            Swal.fire({
                title: "Are you sure?",
                text: "Do you want to Recycle this Contact Subject : " + id,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#6c757d",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, Recycle",
                cancelButtonText: "No, cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    let url = "contactsubjects/";

                    axios
                        .delete(url + id)
                        .then((res) => {
                            this.getContactSubject();
                            Swal.fire(
                                "Recycled!",
                                "Contact Subject has been Recycled.",
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
        restoreContactSubject(id) {
            Swal.fire({
                title: "Are you sure?",
                text: "Do you want to Restore this Contact Subject : " + id,
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#0d6efd",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, Restore",
                cancelButtonText: "No, cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    let url = "contactsubjects/restore/";
                    axios
                        .get(url + id)
                        .then((res) => {
                            this.getContactSubject();
                            Swal.fire(
                                "Restored",
                                "Contact Subject has been Restored.",
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

        resetForm() {
            this.errors = {};
            this.loading = false;
        },

        hideModel() {
            this.modal = !this.modal;
            (this.subject = {
                edit_id: null,
            }),
                this.resetForm();
        },
    },
});
