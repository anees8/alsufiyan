<template>
  <div v-if="!['NotFound', 'login'].includes($route.name)">
    <Navbar />
  </div>
  <div class="mh-100" v-if="!['NotFound', 'login'].includes($route.name)">
    <a class="nav-link" href="https://wa.me/9876543210?text=[Hi]" target="_blank"
      ><font-awesome-icon
        class="whatsapp text-success me-4 h1 position-fixed end-0"
        style="z-index: 99; bottom: 20px"
        icon="fa-brands fa-whatsapp"
        size="xl"
    /></a>
  </div>
  <div class="router_view_min">
    <RouterView />
  </div>
  <div v-if="!['NotFound', 'login'].includes($route.name)">
    <Footer />
  </div>
</template>
<script setup>
import Navbar from "@/Components/common/Navbar.vue";
import Footer from "@/Components/common/Footer.vue";
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Rowdies:wght@300;400;700&display=swap");

:root {
  --primary: #393e46;
  --secondary: #f2e7d5;
  --tertiary: #f7f7f7;
  --black: #000;
  --white: #fff;
}

.router_view_min {
  max-width: 100%;
  min-height: calc(100vh - 367px); /* adjust the height based on the navbar height*/
}
* {
  font-family: "Poppins", cursive;
}
.logo_text {
  font-family: "hexoct";
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
