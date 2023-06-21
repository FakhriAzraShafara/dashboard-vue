<template>
  <main class="mt-0 main-content bg-dark">
    <section>
      <div class="page-header min-vh-100 position-relative">
        <div class="container">
          <div class="row justify-content-center align-items-center">
            <div class="col-lg-4 col-md-6">
              <div class="card card-plain">
                <div class="card-header text-center">
                  <div class="mb-3">
                    <img
                      src="@/assets/img/NDC-logo2.png"
                      class="img-fluid logo"
                      alt="main_logo"
                      width="220"
                    />
                  </div>
                  <h3 class="text-dark font-weight-bolder">
                    Let's Sign Up to Create Your NDC Account!
                  </h3>
                </div>
                <div class="card-body bg-white">
                  <form @submit.prevent="submitRegist">
                    <div class="mb-3">
                      <argon-input
                        type="text"
                        placeholder="Name"
                        aria-label="Name"
                        v-model="input.nama"
                      />
                    </div>
                    <div class="mb-3">
                      <argon-input
                        type="text"
                        v-model="input.username"
                        placeholder="Username"
                        name="username"
                        size="lg"
                      />
                    </div>
                    <div class="mb-3">
                      <argon-input
                        type="password"
                        v-model="input.password"
                        placeholder="Password"
                        name="password"
                        size="lg"
                      />
                    </div>
                    <argon-checkbox checked>
                      <label class="form-check-label" for="flexCheckDefault">
                        I agree the
                        <a
                          href="javascript:;"
                          class="text-dark font-weight-bolder"
                          >Terms and Conditions</a
                        >
                      </label>
                    </argon-checkbox>

                    <div class="text-center mt-4">
                      <argon-button
                        color="primary"
                        fullWidth
                        size="lg"
                        type="submit"
                      >
                        Sign Up
                      </argon-button>
                    </div>
                  </form>
                </div>
                <div class="card-footer text-center bg-white">
                  <p class="text-sm mt-3 mb-0">
                    Already have an account?
                    <router-link
                      class="text-dark font-weight-bolder"
                      :to="{ name: 'Signin' }"
                      >Sign in</router-link
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="position-absolute top-0 left-0 w-100 h-100">
          <svg
            class="w-100 h-100"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 272"
            fill="#E7E8EB"
          >
            <ellipse cx="701" cy="193.5" rx="875" ry="193.5" />
          </svg>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapActions } from "pinia";
import d$auth from "@/stores/auth";
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonCheckbox from "@/components/ArgonCheckbox.vue";
import ArgonButton from "@/components/ArgonButton.vue";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  components: {
    Navbar,
    AppFooter,
    ArgonInput,
    ArgonCheckbox,
    ArgonButton,
  },
  data: () => ({
    input: {
      username: "",
      nama: "",
      password: "",
    },
  }),
  methods: {
    ...mapActions(d$auth, ["a$register"]),
    async submitRegist() {
      try {
        await this.a$register({ ...this.input });
        this.$router.replace({ name: "Signin" });
      } catch (e) {
        console.error(e);
      }
    },
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
};
</script>
