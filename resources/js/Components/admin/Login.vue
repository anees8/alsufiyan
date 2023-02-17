<template>
  <div class="container">
    <div class="row align-items-center justify-content-center vh-100">
      <div class="col-12 col-md-4 p-5 card shadow rounded">
        <div class="text-center">
          <button class="btn btn-dark rounded-circle p-4">
            <font-awesome-icon icon="user" size="3x" />
          </button>
          <div>
            <span v-if="errors.error" class="text-danger">{{ errors.error }}</span>
            <form @submit.prevent="login">
              <div class="py-4">
                <div class="input-group flex-nowrap">
                  <span class="input-group-text" id="addon-wrapping"
                    ><font-awesome-icon class="me-2" icon="at"
                  /></span>
                  <input
                    type="email"
                    name="email"
                    class="form-control"
                    :class="errors.email ? 'is-invalid' : ''"
                    v-model="user.email"
                    placeholder="Email Address"
                    aria-label="email"
                    aria-describedby="addon-wrapping"
                  />
                </div>
                <span v-if="errors.email" class="text-danger">{{ errors.email[0] }}</span>
              </div>
              <div class="pb-4">
                <div class="input-group flex-nowrap">
                  <span class="input-group-text" id="addon-wrapping"
                    ><font-awesome-icon class="me-2" icon="fa-eye-slash" />
                  </span>
                  <input
                    type="password"
                    class="form-control"
                    :class="errors.password ? 'is-invalid' : ''"
                    name="password"
                    v-model="user.password"
                    placeholder="password"
                    aria-label="password"
                    aria-describedby="addon-wrapping"
                  />
                </div>

                <span v-if="errors.password" class="text-danger">{{
                  errors.password[0]
                }}</span>
              </div>

              <div class="align-items-center">
                <button type="submit" class="btn btn-outline-dark">
                  Login<font-awesome-icon class="ms-2" icon="arrow-right" />
                </button>
              </div>
              <RouterLink class="nav-link text-dark mt-3" v-bind:to="{ name: 'Home' }">
                <font-awesome-icon icon="arrow-left" class="me-2" />Back to
                Home</RouterLink
              >
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useLoginStore } from "@/stores/admin/loginStore.js";
const { user, errors, accessToken } = storeToRefs(useLoginStore());
const { login, resetForm } = useLoginStore();

onMounted(() => {
  resetForm();
});
</script>
