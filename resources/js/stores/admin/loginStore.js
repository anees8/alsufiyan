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
        loginUser:null,
        logo:null,
        slogo:null,
        permissions:null,
        errors: {},
        PageLoad:true,
      
    }),

    getters: {
        getAccessToken: (state) => state.accessToken,
    },
    mutations: {},
    actions: {
        pageLoaded(){
            this.PageLoad=false;
        },
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
                if (error.response.status === 403) {
                router.push({"name":"NotAuthorize"});
                }else if(error.response.status === 400){
                                if (error.response.status === 403) {
                router.push({"name":"NotAuthorize"});
                }else if(error.response.status === 400){
               
                this.errors = error.response.data.errors;
                }
                }
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
            this.loginUser=null;
            this.logo=null;
            this.slogo=null;
            this.permissions=null;
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
        router.push({name: 'Logout'}); // redirect to login page
        }
        }
        }, 1000);
        },
        async refreshUserPermissions() {
            if(this.getAccessToken){
            try {
                const response = await axios.get("getAuthUser");
             
                 this.loginUser=response.data.data.username;
                this.logo=response.data.data.logo;
                this.slogo=response.data.data.slogo;
                this.permissions=response.data.data.permissions;



            } catch (error) {
                this.loginUser=null;
                this.logo=null;
                this.slogo=null;
                this.permissions=null;

                if (error.response.data.errors) {
                    this.errors = error.response.data.errors;
                }
            }
        
        }
        }
        
    },
});
