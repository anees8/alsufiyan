<template>
  <hr class="p-0 m-0" />
  <!-- Footer -->

  <footer class="text-center text-lg-start bg-white text-dark">
    <div class="container-fluid text-md-start mt-5">
      <!-- Grid row -->
      <div class="row mt-3">
        <!-- Grid column -->
        <div class="col-md-6 col-lg-4 col-xl-4 mx-auto mb-4">
          <!-- Content -->
          <h5 class="text-uppercase logo_text mb-4">
            <img
              class="ms-5"
              :src="'/logo/logo3.png'"
              alt=""
              width="50"
              height="40"
            />AL-SUFIYAN
          </h5>
          <p>
            Hajj and Umrah are Islamic pilgrimages to Mecca, with Hajj being mandatory and
            Umrah being optional. Service providers offer packages including
            transportation, accommodation, food, etc.
          </p>
        </div>

        <!-- Grid column -->
        <div class="col-md-4 col-lg-2 col-xl-2 mx-auto mb-4">
          <!-- Links -->
          <h6 class="text-uppercase fw-bold mb-4">Useful links</h6>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link text-dark" to="/"
                ><font-awesome-icon class="me-2" icon="home" />Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-dark" to="/about"
                ><font-awesome-icon class="me-2" icon="address-card" />About</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-dark" to="/contact"
                ><font-awesome-icon class="me-2" icon="envelope" />Contact</router-link
              >
            </li>
          </ul>
        </div>
        <!-- Grid column -->
        <div
          class="col-md-6 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 d-flex justify-content-center row align-items-center text-center"
        >
          <h6 class="text-uppercase fw-bold mb-4">Opening times</h6>

          <p>Monday: Friday: 10.00 - 23.00</p>
          <p>Saturday: 10.00 - 19.00</p>

          <p>
            <a
              class="nav-link text-dark me-3 d-inline"
              to="https://www.facebook.com/ColanInfotechTeam/"
              target="_blank"
            >
              <font-awesome-icon
                class="text-primary"
                icon="fa-brands fa-facebook-f"
                size="xl"
              />
            </a>
            <a
              class="nav-link text-dark me-3 d-inline"
              href="https://wa.me/9876543210?text=[Hi]"
              target="_blank"
              ><font-awesome-icon
                class="text-success"
                icon="fa-brands fa-whatsapp"
                size="xl"
            /></a>
          </p>
        </div>
        <!-- Grid column -->
        <div class="col-md-6 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          <!-- Links -->
          <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
          <p>
            <font-awesome-icon icon="location-dot" class="me-3" />
            123 Main St, Anytown USA 12345
          </p>
          <p>
            <font-awesome-icon icon="envelope" class="me-3" />
            info@example.com
          </p>
          <p><font-awesome-icon icon="phone" class="me-3" /> + 01 234 567 89</p>
        </div>
        <!-- Grid column -->
      </div>
      <!-- Grid row -->
    </div>

    <!-- Copyright -->
    <div class="text-center p-4 bg-white text-dark border-top border-1">
      © 2023 Copyright:
      <a class="text-reset fw-bold" href="#">MA TECHNOLGY</a>
    </div>
    <!-- Copyright -->
  </footer>
  <!-- Footer -->
</template>
