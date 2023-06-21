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
                    Let's Sign in to your NDC Account First
                  </h3>
                </div>
                <div class="card-body bg-white">
                  <form @submit.prevent="submitLogin">
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
                    <argon-switch id="rememberMe">Remember me</argon-switch>

                    <div class="text-center mt-4">
                      <argon-button
                        color="primary"
                        fullWidth
                        size="lg"
                        type="submit"
                      >
                        Sign in
                      </argon-button>
                    </div>
                  </form>
                </div>
                <div class="card-footer text-center bg-white">
                  <p class="mb-0">
                    Don't have an account?
                    <router-link
                      class="text-primary text-gradient font-weight-bold"
                      :to="{ name: 'Signup' }"
                      >Sign up</router-link
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

<style>
.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
}

.top-0 {
  top: 0;
  margin-top: 400px;
}

.left-0 {
  left: 0;
}

.w-100 {
  width: 100%;
}

.h-100 {
  height: 100%;
}
</style>

<script>
import Signup from "@/views/Auth/Signup.vue";
import { mapActions } from "pinia";
import d$auth from "@/stores/auth";
import Navbar from "@/examples/PageLayout/Navbar.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  components: {
    Navbar,
    ArgonInput,
    ArgonSwitch,
    ArgonButton,
    Signup,
  },
  data: () => ({
    //Input
    input: {
      username: "",
      password: "",
    },
  }),
  methods: {
    ...mapActions(d$auth, ["a$login"]),
    async submitLogin() {
      try {
        await this.a$login({ ...this.input });
        console.log("suksess");
        this.$router.replace({ name: "Default" });
      } catch (e) {
        console.error(e);
        window.alert("Login Failed. Please Try again\n" + e);
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
