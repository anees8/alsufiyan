import { createWebHistory, createRouter } from "vue-router";
import { useLoginStore } from "@/stores/admin/loginStore.js";

// webpage
import Home from "./Components/web/Home.vue";
import About from "./Components/web/About.vue";
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
import AdminAbout from "./Components/admin/About.vue";

import AdminImages from "./Components/admin/Images.vue";
import AdminVideos from "./Components/admin/Videos.vue";
import AdminBlog from "./Components/admin/Blog.vue";
import AdminContact from "./Components/admin/contact.vue";
import AdminContactSubject  from "./Components/admin/ContactComponents/ContactSubject.vue";
import AdminHomeSlider from "./Components/admin/HomeComponents/HomeSlider.vue";
import AdminHomePackage from './Components/admin/HomeComponents/HomePackage.vue';
import AdminUsers from './Components/admin/Users.vue';


const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            requireAuth: false,
        },
    },
    {
        path: "/aboutus",
        name: "About",
        component: About,
        meta: {
            requireAuth: false,
        },
    },
    {
        path: "/images",
        name: "gallery",
        component: Gallery,
        meta: {
            requireAuth: false,
        },
    },
    {
        path: "/video",
        name: "Videos",
        component: Videos,
        meta: {
            requireAuth: false,
        },
    },

    {
        path: "/blog",
        name: "blog",
        component: blog,
        meta: {
            requireAuth: false,
        },
    },

    {
        path: "/post/:id",
        name: "PostDetail",
        component: PostDetail,
        props: (route) => ({
            id: Number(route.params.id),
        }),
        meta: {
            requireAuth: false,
        },
    },
    {
        path: "/contact",
        name: "contact",
        component: Contact,
        meta: {
            requireAuth: false,
        },
    },
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: NotFound,
        meta: {
            requireAuth: false,
        },
    },
    // Admin Router Link
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            requireAuth: false,
        },
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
            requireAuth: true,
        },
    },
    {
        path: "/logout",
        name: "Logout",
        component: Logout,
        meta: {
            requireAuth: true,
        },
    },
    {
        path: "/admin/about",
        name: "AdminAbout",
        component: AdminAbout,
        meta: {
            requireAuth: true,
        },
    },
    {
        path: "/admin/home/slider",
        name: "AdminHomeSlider",
        component: AdminHomeSlider,
        meta: {
            requireAuth: true,
        },
    },


    {
        path: "/admin/blog",
        name: "AdminBlog",
        component: AdminBlog,
        meta: {
            requireAuth: true,
        },
    },
    {
        path: "/admin/users",
        name: "AdminUsers",
        component: AdminUsers,
        meta: {
            requireAuth: true,
        },
    },
    
    
    {
        path: "/admin/image",
        name: "AdminImage",
        component: AdminImages,
        meta: {
            requireAuth: true,
        },
    },
    {
        path: "/admin/video",
        name: "AdminVideo",
        component: AdminVideos,
        meta: {
            requireAuth: true,
        },
    },{
        path: "/admin/contact",
        name: "AdminContact",
        component: AdminContact,
        meta: {
            requireAuth: true,
        },
    },
    {
        path: "/admin/contact/subject",
        name: "AdminContactSubject",
        component: AdminContactSubject,
        meta: {
            requireAuth: true,
        },
    },
    {
        path: "/admin/home/package",
        name: "AdminHomePackage",
        component: AdminHomePackage,
        meta: {
            requireAuth: true,
        },
    },

    
    

    
];

const router = createRouter({
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 };
    },
    history: createWebHistory(),
    routes,
});


router.beforeEach((to, from, next) => {
    const { getAccessToken } = useLoginStore();
    if (to.meta.requireAuth && getAccessToken === null) {
        next({ name: "Login" });
    }
    if (
        to.name === "Login" &&
        !to.meta.requireAuth &&
        getAccessToken !== null
    ) {
        next({ name: "Dashboard" });
    }
    next();
});


export default router;
