<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light justify-content-between py-0">
      <div class="container-fluid text-center">
        <a class="navbar-brand logo_text" href="#"
          ><img
            class="ms-5"
            :src="'/logo/logo3.png'"
            alt=""
            width="50"
            height="40"
          />AL-SUFIYAN</a
        >

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul
            class="navbar-nav m-auto me-md-5 mb-0 flex items-center justify-between text-center"
          >
            <li class="nav-item mx-0">
              <router-link
                class="nav-link px-3 py-3 text-dark"
                exact
                active-class="active  border-bottom border-1   shadow-sm  border-dark  bg-light "
                to="/"
                ><font-awesome-icon class="me-2" icon="home" />Home</router-link
              >
            </li>
            <li class="nav-item mx-0">
              <router-link
                class="nav-link px-3 py-3 text-dark"
                exact
                active-class="active  border-bottom border-1   shadow-sm  border-dark  bg-light "
                to="/about"
                ><font-awesome-icon class="me-2" icon="address-card" />About</router-link
              >
            </li>
            <li class="nav-item mx-0">
              <router-link
                class="nav-link px-3 py-3 text-dark"
                exact
                active-class="active  border-bottom border-1   shadow-sm  border-dark  bg-light "
                to="/posts"
                ><font-awesome-icon class="me-2" icon="blog" />Posts</router-link
              >
            </li>
            <li class="nav-item mx-0">
              <router-link
                class="nav-link px-3 py-3 text-dark"
                exact
                active-class="active  border-bottom border-1   shadow-sm  border-dark  bg-light "
                to="/postimages"
                ><font-awesome-icon class="me-2" icon="image" />Gallery</router-link
              >
            </li>
            <li class="nav-item mx-0">
              <router-link
                class="nav-link px-3 py-3 text-dark"
                exact
                active-class="active  border-bottom border-1   shadow-sm  border-dark bg-light "
                to="/contact"
                ><font-awesome-icon class="me-2" icon="envelope" />Contact</router-link
              >
            </li>

            <li class="nav-item mx-0">
              <router-link
                class="nav-link px-3 py-3 text-dark"
                exact
                active-class="active  border-bottom border-1  shadow-sm border-dark bg-light"
                to="/login"
                >Login<font-awesome-icon class="ms-2" icon="arrow-right"
              /></router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <hr class="p-0 m-0" />
</template>
<style scoped>
.navbar {
  font-weight: 500;
}
</style>
