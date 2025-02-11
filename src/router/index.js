import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { certCookies } from "../plugins/cookies";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "",
  linkExactActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const { id_user } = certCookies();
  if (to.matched.some(({ meta }) => meta.auth) && !id_user) {
    next({ name: "Signin" });
  } else if (to.matched.some(({ path }) => path.includes("auth")) && id_user) {
    next({ name: "Default" });
  } else {
    next();
  }
});

export default router;