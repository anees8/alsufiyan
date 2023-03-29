import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment";
import router from "../../router.js";
export const useAdminVideosStore = defineStore("adminvideosStore", {
    state: () => ({
        fields: [
            { key: "id", label: "ID", tdClass: "align-middle" },
            { key: "video", label: "Videos" },
            { key: "username", label: "Username", tdClass: "align-middle" },
            {
                key: "created_at",
                label: "Created Date",
                tdClass: "align-middle",
            },
            { key: "actions", label: "Actions", tdClass: "align-middle" },
        ],
        videos: [],
        perPage: 5,
        currentPage: 1,
        isBusy: false,
        loading: false,
        modal: false,
        rows: null,
        options: [
            { value: 5, text: "5" },
            { value: 10, text: "10" },
            { value: 50, text: "50" },
            { value: 100, text: "100" },
        ],
        edit_id: null,
        videoTypes: [
            { value: 1, text: "File" },
            { value: 2, text: "Video Url" },
        ],
        videoType: 1,
        video: "",
        video_url: "",
        previewVideo: null,
        errors: {},
    }),

    actions: {
        async getVideos() {
            this.isBusy = true;
            try {
                let url = "videos";
                url += `?with_deleted`;
                if (this.perPage) {
                    url += `&perPage=${this.perPage}`;
                }
                if (this.currentPage > 1) {
                    url += `&page=${this.currentPage}`;
                }
                const response = await axios.get(url);

                this.videos = response.data.data.videos.data;

                this.currentPage = response.data.data.videos.current_page;
                this.rows = response.data.data.videos.total;

                setTimeout(() => {
                    this.isBusy = false;
                }, 300); // set timeout to 1 second
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
                }
                setTimeout(() => {
                    this.errors = {};
                }, 5000);
            }
        },

        async uploadFile() {
            if (!this.edit_id) {
                const formData = new FormData();

                // formData.append('image', this.image);
                if (this.video) {
                    formData.append("video", this.video);
                }
                if (this.video_url) {
                    formData.append("url", this.video_url);
                }

                let config = {
                    header: { "content-type": "multipart/form-data" },
                };
                this.loading = true;

                try {
                    let url = "videos";
                    const response = await axios.post(url, formData, config);
                    this.videoType = 1;

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
                    let url = "videos/";
                    const formData = new FormData();

                    if (this.video) {
                        formData.append("video", this.video);
                    }
                    if (this.video_url) {
                        formData.append("url", this.video_url);
                    }
                    formData.append("_method", "put");
                    let config = {
                        header: { "Content-Type": "multipart/form-data" },
                    };
                    const response = await axios.post(
                        url + this.edit_id,
                        formData,
                        config
                    );
                    this.videoType = 1;

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

        editVideo(id) {
            let vid = this.videos.find((vid) => vid.id == id);
            if (vid) {
                this.edit_id = id;
                this.videoType = 1;
                this.previewVideo = vid.src;
                this.modal = !this.modal;
            }
        },

        deleteVideo(id) {
            Swal.fire({
                title: "Are you sure?",
                text: "Do you want to Delete Permanently this Video : " + id,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, Delete",
                cancelButtonText: "No, cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    let url = "videos/forcedelete/";

                    axios
                        .get(url + id)
                        .then((res) => {
                            this.getVideos();
                            Swal.fire(
                                "Deleted!",
                                "Video has been deleted.",
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
        recycleVideo(id) {
            Swal.fire({
                title: "Are you sure?",
                text: "Do you want to Recycle this Video : " + id,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#6c757d",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, Recycle",
                cancelButtonText: "No, cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    let url = "videos/";

                    axios
                        .delete(url + id)
                        .then((res) => {
                            this.getVideos();
                            Swal.fire(
                                "Recycled!",
                                "Video has been Recycled.",
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
        restoreVideo(id) {
            Swal.fire({
                title: "Are you sure?",
                text: "Do you want to Restore this Video : " + id,
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#0d6efd",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, Restore",
                cancelButtonText: "No, cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    let url = "videos/restore/";
                    axios
                        .get(url + id)
                        .then((res) => {
                            this.getVideos();
                            Swal.fire(
                                "Restored",
                                "Video has been Restored.",
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
            this.getVideos();
        },

        onFileChange: function (e) {
            this.video = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                this.previewVideo = reader.result;
            };
        },

        resetForm: function () {
            this.errors = {};
            this.message = "";
            const input = document.getElementById("video");
            if (input) {
                input.value = "";
            }

            this.video = null;
            if (!this.edit_id) {
                this.previewVideo = null;
            }
            this.video_url = null;

            this.loading = false;
        },

        hideModel: function () {
            this.modal = !this.modal;
            this.previewVideo = null;
            this.videoType = 1;
            this.edit_id = null;
            this.getVideos();
            this.resetForm();
        },
    },
});
