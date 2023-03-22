import { defineStore } from "pinia";
import axios from "axios";
import router from "../../router.js";


export const useLoginStore = defineStore("loginStore", {
    state: () => ({
        user: {
            email: "",
            password: "",
        },       
        loading: false,
        timer:300,
        timeout:0,
        accessToken: localStorage.getItem("token"),
        loginUser: localStorage.getItem("name"),
        errors: {},
      
    }),

    getters: {
        getAccessToken: (state) => state.accessToken,
    },
    mutations: {},
    actions: {
        
        async login() {
            this.loading = true;
            try {
                const response = await axios.post("login", this.user);
                this.setToken(response.data.data);
                if (response.data.data.token) {
                    axios.defaults.headers.common["Authorization"] =
                        "Bearer " + response.data.data.token;
                }
            } catch (error) {
                if (error.response) {
                    this.errors = error.response.data.errors;
                }
                this.loading = false;
            }
        },
        async logout() {
            this.loading = true;
            try {
                const response = await axios.get("logout");
            } catch (error) {
                if (error.response) {
                    this.errors = error.response.data.errors;
                }
            }
        },

        setToken: function (data) {
            this.accessToken = data.token;
            this.loginUser = data.user.name;
            localStorage.setItem("token", data.token);
            localStorage.setItem("name", data.user.name);
            this.errors = {};
            this.user.email = null;
            this.user.password = null;
            this.loading = false;
            router.push({ name: "Dashboard" });
        },
        removeToken: function () {
            this.logout();
            this.loginUser=null;
            this.accessToken = null;
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            router.push({ name: "Login" });
        },
        resetForm: function () {
            this.errors = {};
            this.user.email = null;
            this.user.password = null;
            this.loading = false;
        },
        startIdleTimer() {
   

      const resetTimer = () => {
        this.timer = 300;  
      };

      window.addEventListener('mousemove', resetTimer);
      window.addEventListener('keydown', resetTimer);
      window.addEventListener('click', resetTimer);

       setInterval(() => {
        if(this.accessToken){
        this.timer--;
        if (this.timer <= this.timeout) {
          router.push('/logout'); // redirect to login page
        }
    }
      }, 1000);
    }
    },
});
