import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment";
import router from "../../../router.js";

export const useAdminPackageStore = defineStore("adminpackageStore", {
    state: () => ({
        fields: [
            { key: "id", label: "ID" },
            { key: "image", label: "Image" },
            { key: "title", label: "Title"  },
            { key: "description", label: "Description"  },
            { key: "days" , label: "Days"},
            { key: "price" , label: "Price"},
            { key: "username", label: "Username" },
            { key: "created_at", label: "Created Date" },
            { key: "actions", label: "Action" },
        ],
        packages: [],
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
        pack: {
            edit_id: null,
            imageType: 1,
            image: null,
            image_url: null,
            title: null,
            description: null,
            days: null,
            price: null,
            previewImage: null,
        },

        imageTypes: [
            { value: 1, text: "File" },
            { value: 2, text: "Image Url" },
        ],
        errors: {},
    }),

    actions: {
        async getHomePackages() {
            this.isBusy = true;
            try {
                let url = "homepackagesliders";
                url += `?with_deleted`;
                if (this.perPage) {
                    url += `&perPage=${this.perPage}`;
                }
                if (this.currentPage > 1) {
                    url += `&page=${this.currentPage}`;
                }
                const response = await axios.get(url);

                this.packages = response.data.data.packages.data;

                this.currentPage = response.data.data.packages.current_page;
                this.rows = response.data.data.packages.total;

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

        async uploadFile() {
            if (!this.pack.edit_id) {
                const formData = new FormData();

                // formData.append('image', this.image);
                if (this.pack.image) {
                    formData.append("image", this.pack.image);
                }
                if (this.pack.image_url) {
                    formData.append("url", this.pack.image_url);
                }
                if (this.pack.title) {
                    formData.append("title", this.pack.title);
                }
                if (this.pack.description) {
                    formData.append("description", this.pack.description);
                }
                if (this.pack.price) {
                    formData.append("price", this.pack.price);
                }
                if (this.pack.days) {
                    formData.append("days", this.pack.days);
                }

                let config = {
                    header: { "content-type": "multipart/form-data" },
                };
                this.loading = true;

                try {
                    let url = "homepackagesliders";
                    const response = await axios.post(url, formData, config);
                    this.pack.imageType = 1;

                    this.hideModel();
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
                this.loading = true;
                try {
                    let url = "homepackagesliders/";
                    const formData = new FormData();

                    if (this.pack.image) {
                        formData.append("image", this.pack.image);
                    }
                    if (this.pack.image_url) {
                        formData.append("url", this.pack.image_url);
                    }
                    if (this.pack.title) {
                        formData.append("title", this.pack.title);
                    }
                    if (this.pack.description) {
                        formData.append("description", this.pack.description);
                    }
                    if (this.pack.price) {
                        formData.append("price", this.pack.price);
                    }
                    if (this.pack.days) {
                        formData.append("days", this.pack.days);
                    }
                    formData.append("_method", "put");
                    let config = {
                        header: { "Content-Type": "multipart/form-data" },
                    };
                    const response = await axios.post(
                        url + this.pack.edit_id,
                        formData,
                        config
                    );
                    this.pack.imageType = 1;

                    this.hideModel();
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
        },

        editHomePackage(id) {
            let packs = this.packages.find((packs) => packs.id == id);
            if (packs) {
                this.pack.edit_id = id;
                this.pack.imageType = 1;
                this.pack.title = packs.title;
                this.pack.description = packs.description;
                this.pack.days = packs.days;
                this.pack.price = packs.price;
                this.pack.previewImage = packs.image;
                this.modal = !this.modal;
            }
        },

        deleteHomePackage(id) {
            Swal.fire({
                title: "Are you sure?",
                text:
                    "Do you want to Delete Permanently this Home Package Slider: " +
                    id,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, Delete",
                cancelButtonText: "No, cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    let url = "homepackagesliders/forcedelete/";

                    axios
                        .get(url + id)
                        .then((res) => {
                            this.getHomePackages();
                            Swal.fire(
                                "Deleted!",
                                "Home Package Slider has been deleted.",
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
        recycleHomePackage(id) {
            Swal.fire({
                title: "Are you sure?",
                text: "Do you want to Recycle this Home Package Slider : " + id,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#6c757d",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, Recycle",
                cancelButtonText: "No, cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    let url = "homepackagesliders/";

                    axios
                        .delete(url + id)
                        .then((res) => {
                            this.getHomePackages();
                            Swal.fire(
                                "Recycled!",
                                "Home Package Slider has been Recycled.",
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
        restoreHomePackage(id) {
            Swal.fire({
                title: "Are you sure?",
                text: "Do you want to Restore this Home Package Slider : " + id,
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#0d6efd",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, Restore",
                cancelButtonText: "No, cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    let url = "homepackagesliders/restore/";
                    axios
                        .get(url + id)
                        .then((res) => {
                            this.getHomePackages();
                            Swal.fire(
                                "Restored",
                                "Home Package Slider has been Restored.",
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

        dateTime(value) {
            return value?moment(value).format("D-MMM-Y"):null;
        },

        setPerPage(value) {
            this.perPage = value;
            this.currentPage = 1;
            this.getHomePackages();
        },

        onFileChange: function (e) {
            this.pack.image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                this.pack.previewImage = reader.result;
            };
        },

        resetForm() {
            this.errors = {};
            this.message = "";
            const input = document.getElementById("image");
            if (input) {
                input.value = "";
            }

            this.pack.image = null;
            if (!this.pack.edit_id) {
                this.pack.previewImage = null;
            }
            this.pack.image_url = null;

            this.loading = false;
        },

        hideModel() {
            this.modal = !this.modal;
            (this.pack = {
                edit_id: null,
                imageType: 1,
                image: null,
                image_url: null,
                title: null,
                description: null,
                days: null,
                price: null,
                previewImage: null,
            }),
                this.getHomePackages();
            this.resetForm();
        },
    },
});
