import { createWebHistory, createRouter } from "vue-router";

// webpage Pannel
import Home from "@/Components/web/Home.vue";
import AboutPage from "@/Components/web/AboutPage.vue";
import NotFound from "@/Components/web/NotFound.vue";
import Contact from "@/Components/web/Contact.vue";
import Gallery from "@/Components/web/Gallery.vue";
import blog from "@/Components/web/Blog.vue";
import PostDetail from "@/Components/web/BlogComponents/PostDetail.vue";


// Admin Pannel

import Login from "@/Components/dashboard/Login.vue";

const routes = [
{
path: "/",
name: "Home",
component:Home,
meta:{
requireAuth:false
}
},
{
path: "/about_us",
name: "About",
component:AboutPage,
meta:{
requireAuth:false
}
},
{
path: "/images",
name: "gallery",
component:Gallery,
meta:{
requireAuth:false
}
},
{
path: "/blog",
name: "blog",
component: blog,
meta:{
requireAuth:false
}
},

{
path: "/post/:id",
name: "PostDetail",
component: PostDetail,
props: true,
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

export default createRouter({
    history: createWebHistory(),
    routes
});

