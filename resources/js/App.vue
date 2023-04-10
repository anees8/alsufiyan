<template>
  <div v-if="Loading">
    <div class="bodybackground">
      <Navbar
        v-if="
          [
            'Home',
            'About',
            'gallery',
            'blog',
            'PostDetail',
            'contact',
            'Videos',
          ].includes($route.name)
        "
      />

      <div
        class="sidebar"
        v-if="
          ![
            'Home',
            'About',
            'gallery',
            'blog',
            'PostDetail',
            'contact',
            'Videos',
            'Login',
            'NotFound',
            'Logout',
            'NotAuthorize',
          ].includes($route.name)
        "
      >
        <Sidebar />

        <div class="content">
          <Header />
          <RouterView class="m-3" />
        </div>
      </div>

      <div
        class="mh-100"
        v-if="
          [
            'Home',
            'About',
            'gallery',
            'blog',
            'PostDetail',
            'contact',
            'Videos',
          ].includes($route.name)
        "
      >
        <a class="nav-link" href="https://wa.me/9876543210?text=[Hi]" target="_blank"
          ><font-awesome-icon
            class="whatsapp text-success me-4 h1 position-fixed end-0"
            style="z-index: 1; bottom: 80px"
            icon="fa-brands fa-whatsapp"
            size="xl"
        /></a>
      </div>
      <HomeContactModal
        v-if="
          [
            'Home',
            'About',
            'gallery',
            'blog',
            'PostDetail',
            'contact',
            'Videos',
          ].includes($route.name)
        "
      />
      <RouterView
        v-if="
          [
            'Home',
            'About',
            'gallery',
            'blog',
            'PostDetail',
            'contact',
            'Videos',
            'Login',
            'NotFound',
            'NotAuthorize',
            'Logout',
          ].includes($route.name)
        "
      />
    </div>

    <Footer
      v-if="
        ['Home', 'About', 'gallery', 'blog', 'PostDetail', 'contact', 'Videos'].includes(
          $route.name
        )
      "
    />
  </div>
  <div v-else>
    <Loader />
  </div>
</template>
<script setup>
import { ref, onBeforeMount } from "vue";

import { defineAsyncComponent } from "vue";
import { useLoginStore } from "./stores/admin/loginStore";

const HomeContactModal = defineAsyncComponent(() =>
  import("./Components/web/HomeComponents/HomeContactModal.vue")
);
const Navbar = defineAsyncComponent(() => import("@/Components/common/Navbar.vue"));
const Loader = defineAsyncComponent(() => import("@/Components/common/HomeLoader.vue"));
const Header = defineAsyncComponent(() => import("@/Components/common/Header.vue"));
const Sidebar = defineAsyncComponent(() => import("@/Components/common/Sidebar.vue"));
const Footer = defineAsyncComponent(() => import("@/Components/common/Footer.vue"));
const { startIdleTimer, refreshUserPermissions } = useLoginStore();

const Loading = ref(false);

startIdleTimer();
onBeforeMount(() => {
  refreshUserPermissions();

  setTimeout(() => {
    Loading.value = true;
  }, 1000); // set timeout to 1 second
});
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Rowdies:wght@300;400;700&display=swap");

:root {
  --primary: #393e46;
  --secondary: #f2e7d5;
  --tertiary: #f7f7f7;
  --black: #000;
  --white: #fff;
  --one: #0098c9;
  --two: #0098c9;
  --three: #00b8c2;
  --four: #00d4a7;
  --five: #96eb84;
  --six: #f9f871;
}
.bodybackground {
  background-color: var(--secondary);
}

.router_view_min {
  max-width: 100%;
  margin-top: 55px;
  min-height: calc(100vh - 367px);
  /* adjust the height based on the navbar height*/
}

* {
  font-family: "Poppins", cursive;
}
.logo_text {
  font-family: "slipstream";
}

@font-face {
  font-family: "slipstream";
  src: url("/fontstyle/slipstream/slipstream.ttf") format("truetype");
}
@font-face {
  font-family: "hexoct";
  src: url("/fontstyle/hexoct/hexoct.ttf") format("truetype");
}

@font-face {
  font-family: "love";
  src: url("/fontstyle/love/Love.ttf") format("truetype");
}

@font-face {
  font-family: "universe";
  src: url("/fontstyle/universe/universe.ttf") format("truetype");
}

@font-face {
  font-family: "hidayat";
  src: url("/fontstyle/hidayath/Hidayatullah.ttf") format("truetype");
}
</style>
<style scoped>
.sidebar {
  display: flex;
}

.sidebar .content {
  flex: 1 1 0;
}
</style>
