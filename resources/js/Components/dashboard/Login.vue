<template>
  <div class="container">
    <div class="row align-items-center justify-content-center vh-100">
      <div class="col-12 col-md-4 p-5 card shadow rounded">
        <div class="text-center">
          <button class="btn btn-dark rounded-circle p-4">
            <font-awesome-icon icon="user" size="3x" />
          </button>
          <div>
            <form method="POST">
              <div class="py-4">
                <div class="input-group flex-nowrap">
                  <span class="input-group-text" id="addon-wrapping"
                    ><font-awesome-icon class="me-2" icon="at"
                  /></span>
                  <input
                    type="email"
                    name="email"
                    class="form-control"
                    placeholder="Email Address"
                    aria-label="email"
                    aria-describedby="addon-wrapping"
                  />
                </div>
              </div>
              <div class="pb-4">
                <div class="input-group flex-nowrap">
                  <span class="input-group-text" id="addon-wrapping"
                    ><font-awesome-icon class="me-2" icon="fa-eye-slash" />
                  </span>
                  <input
                    type="password"
                    class="form-control"
                    name="password"
                    placeholder="password"
                    aria-label="password"
                    aria-describedby="addon-wrapping"
                  />
                </div>
              </div>

              <div class="align-items-center">
                <button type="submit" class="btn btn-outline-dark">
                  Login<font-awesome-icon class="ms-2" icon="arrow-right" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
