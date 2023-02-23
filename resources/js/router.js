import { createWebHistory, createRouter } from "vue-router";
import { useLoginStore } from "@/stores/admin/loginStore.js";


// webpage
import Home from "./Components/web/Home.vue";
import AboutPage from "./Components/web/AboutPage.vue";
import NotFound from "./Components/web/NotFound.vue";
import Contact from "./Components/web/Contact.vue";
import Gallery from "./Components/web/Gallery.vue";
import Videos from "./Components/web/Videos.vue";
import blog from "./Components/web/Blog.vue";
import PostDetail from "./Components/web/BlogComponents/PostDetail.vue";


// Dashboard
import Login from "./Components/admin/Login.vue";
import Logout from "./Components/admin/Logout.vue";
import Dashboard from "./Components/admin/Dashboard.vue";
import AdminAbout from "./Components/admin/AdminAbout.vue";
import AdminHome from "./Components/admin/AdminHome.vue";

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
    path: "/videos",
    name: "Videos",
    component:Videos,
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
    path: '/post/:id',
name: "PostDetail",
component: PostDetail,
props: route => ({
id: Number(route.params.id)
}),
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
path: "/:catchAll(.*)",
name: "NotFound",
component: NotFound,
meta:{
requireAuth:false
}
},
// Admin Router Link
{
path: "/login",
name: "Login",
component:Login,
meta:{
requireAuth:false
}
},
{
path: "/dashboard",
name: "Dashboard",
component: Dashboard,
meta:{
requireAuth:true
}
},
{
path: "/logout",
name: "Logout",
component: Logout,
meta:{
requireAuth:true
}
},
{
path: "/admin_about",
name: "AdminAbout",
component: AdminAbout,
meta:{
requireAuth:true
}
},
{
path: "/admin_home",
name: "AdminHome",
component: AdminHome,
meta:{
requireAuth:true
}
},



];

const router=createRouter({
scrollBehavior(to, from, savedPosition) {
// always scroll to top
return { top: 0 }
},
history: createWebHistory(),
routes
});

router.beforeEach((to, from, next) => {
const { getAccessToken } = useLoginStore();
if(to.meta.requireAuth  && getAccessToken === null){
next({ name: 'Login' });
}
if (to.name === 'Login' && !to.meta.requireAuth && getAccessToken !== null){ 
next({ name: 'Dashboard' });
}
next();
})



export default router;




