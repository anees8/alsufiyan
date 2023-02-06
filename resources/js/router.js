import { createWebHistory, createRouter } from "vue-router";
import Home from "@/Components/Home.vue";
import About from "@/Components/About.vue";
import NotFound from "@/Components/NotFound.vue";
import Contact from "@/Components/Contact.vue";
import Login from "@/Components/Login.vue";
import Gallery from "@/Components/Gallery.vue";


    
const routes = [
{
path: "/",
name: "Home",
component: Home,
meta:{
requireAuth:false
}
},
{
path: "/about",
name: "About",
component: About,
meta:{
requireAuth:false
}
},
{
    path: "/postimages",
    name: "gallery",
    component: Gallery,
    meta:{
    requireAuth:false
    }
    },
{
path: "/contact",
name: "contact",
component: Contact,
meta:{
requireAuth:false
}
},

{
    path: "/login",
    name: "login",
    component: Login,
    meta:{
    requireAuth:false
    }
    },
{
path: "/:catchAll(.*)",
name: "NotFound",
component: NotFound,
},
];


const router = createRouter({
history: createWebHistory(),
routes,
});



export default router;