import { createWebHistory, createRouter } from "vue-router";
import { useLoginStore } from "@/stores/admin/loginStore.js";

const routes = [
    {
        path: "/",
        name: "Home",
        component: ()=>import('./Components/web/Home.vue'),
        meta: {
            requireAuth: false,    
        },
    },
    {
        path: "/aboutus",
        name: "About",
           component: ()=>import('./Components/web/About.vue'),
        meta: {
            requireAuth: false,
        },
    },
    {
        path: "/images",
        name: "gallery",
        component: ()=>import('./Components/web/Gallery.vue'),
        meta: {
            requireAuth: false,
        },
    },
    {
        path: "/video",
        name: "Videos",
        component: ()=>import('./Components/web/Videos.vue'),
        meta: {
            requireAuth: false,
        },
    },

    {
        path: "/blog",
        name: "blog",
        component: ()=>import('./Components/web/Blog.vue'),
        meta: {
            requireAuth: false,
        },
    },

    {
        path: "/post/:id",
        name: "PostDetail",
        component: ()=>import('./Components/web/BlogComponents/PostDetail.vue'),
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
        component: ()=>import('./Components/web/Contact.vue'),
        meta: {
            requireAuth: false,
        },
    },
    {
        path: "/unautharize",
        name: "NotAuthorize",
        component: ()=>import('./Components/web/NotAuthorize.vue'),
        meta: {
            requireAuth: false,
        },
    },
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: ()=>import('./Components/web/NotFound.vue'),
        meta: {
            requireAuth: false,
        },
    },    
    // Admin Router Link
    {
        path: "/admin/login",
        name: "Login",
        component: ()=>import('./Components/admin/Login.vue'),
        meta: {
            requireAuth: false,
        },
    },
    {
        path: "/admin/dashboard",
        name: "Dashboard",
        component: ()=>import('./Components/admin/Dashboard.vue'),
        meta: {
            requireAuth: true,
        },
    },
    {
        path: "/admin/logout",
        name: "Logout",
        component: ()=>import('./Components/admin/Logout.vue'),
        meta: {
            requireAuth: true,
        },
    },
    {
        path: "/admin/about",
        name: "AdminAbout",
        component: ()=>import('./Components/admin/About.vue'),
        meta: {
            requireAuth: true,
        },
    },
    {
        path: "/admin/home/slider",
        name: "AdminHomeSlider",
        component: ()=>import('./Components/admin/HomeComponents/HomeSlider.vue'),
        meta: {
            requireAuth: true,
        },
    },
    {
        path: "/admin/home/counter",
        name: "AdminHomeCounter",
        component: ()=>import('./Components/admin/HomeComponents/HomeCounter.vue'),
        meta: {
            requireAuth: true,
        },
    },
    {
        path: "/admin/blog",
        name: "AdminBlog",
        component: ()=>import('./Components/admin/Blog.vue'),
        meta: {
            requireAuth: true,
        },
    },
    {
        path: "/admin/users",
        name: "AdminUsers",
        component: ()=>import('./Components/admin/Users.vue'),
        meta: {
            requireAuth: true,
        },
    },  
    {
        path: "/admin/roles/users",
        name: "AdminRolesUsers",
        component: ()=>import('./Components/admin/UsersComponents/UserRoles.vue'),
        meta: {
            requireAuth: true,
        },
    }, 
    {
        path: "/admin/roles/permissions",
        name: "AdminRolesPermissions",
        component: ()=>import('./Components/admin/UsersComponents/Roles.vue'),
        meta: {
            requireAuth: true,
        },
    },  
    
    {
        path: "/admin/users/permissions",
        name: "AdminUsersPermissions",
        component: ()=>import('./Components/admin/UsersComponents/Permissions.vue'),
        meta: {
            requireAuth: true,
        },
    },    
    {
        path: "/admin/roles/permission/:id?",
        name: "AdminRolesPermissionsEdit",
        component: ()=>import('./Components/admin/UsersComponents/RolesComponents/EditRole.vue'),
        props: (route) => ({
            id: Number(route.params.id),
        }),
        meta: {
            requireAuth: true,
        },
    },    
    {
        path: "/admin/roles/user/:id?",
        name: "AdminRolesUserEdit",
        component: ()=>import('./Components/admin/UsersComponents/RolesComponents/EditRoleUser.vue'),
        props: (route) => ({
            id: Number(route.params.id),
        }),
        meta: {
            requireAuth: true,
        },
    },  
    {
        path: "/admin/image",
        name: "AdminImage",
        component: ()=>import('./Components/admin/Images.vue'),
        meta: {
            requireAuth: true,
        },
    },
    {
        path: "/admin/video",
        name: "AdminVideo",
        component: ()=>import('./Components/admin/Videos.vue'),
        meta: {
            requireAuth: true,
        },
    },{
        path: "/admin/contact",
        name: "AdminContact",
        component: ()=>import('./Components/admin/contact.vue'),
        meta: {
            requireAuth: true,
        },
    },
    {
        path: "/admin/contact/subject",
        name: "AdminContactSubject",
        component: ()=>import('./Components/admin/ContactComponents/ContactSubject.vue'),
        meta: {
            requireAuth: true,
        },
    },
    {
        path: "/admin/home/package",
        name: "AdminHomePackage",
        component: ()=>import('./Components/admin/HomeComponents/HomePackage.vue'),
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
    routes: routes
  });


  router.beforeEach((to, from, next) => {
    const { getAccessToken, refreshUserPermissions } = useLoginStore();
    refreshUserPermissions();

    if (to.meta.requireAuth && getAccessToken === null) {   
        next({ name: "Login" });
    } else if (to.name === "Login" && !to.meta.requireAuth && getAccessToken !== null) {       
        next({ name: "Dashboard" });
    } else {
        next();
    }
});


export default router;
