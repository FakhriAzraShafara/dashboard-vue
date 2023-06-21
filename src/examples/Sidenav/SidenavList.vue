<template>
  <div
    class="collapse navbar-collapse w-auto h-auto h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-item
          url="/dashboard"
          :class="getRoute() === '' ? 'active' : 'fs-6 ps-4'"
          :navText="this.$store.state.isRTL ? 'لوحة القيادة' : 'Dashboard'"
        >
          <template v-slot:icon>
            <i
              class="ni ni-tv-2 text-primary text-sm opacity-10 bg-light py-1 px-2 rounded me-3"
            ></i>
          </template>
        </sidenav-item>
      </li>
      <h6
        v-if="this.$store.state.isRTL"
        class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
        :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
      >
        صفحات المرافق
      </h6>
      <h6
        v-else
        class="text-xs ps-4 pt-3 text-uppercase font-weight-bolder opacity-6 text-light"
        :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
      >
        Data Master
      </h6>
      <li class="nav-item">
        <sidenav-item
          url="/dashboard/data-scw"
          :class="getRoute() === 'data-scw' ? 'active' : 'fs-6 ps-4'"
          :navText="this.$store.state.isRTL ? 'بيانات SCW' : 'Data SCW'"
        >
          <template v-slot:icon>
            <i
              class="ni ni-single-copy-04 text-primary text-sm opacity-10 bg-light py-1 px-2 rounded me-3"
            ></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/dashboard/employee"
          :class="getRoute() === 'employee' ? 'active' : 'fs-6 ps-4'"
          :navText="this.$store.state.isRTL ? 'بيانات الموظف' : 'Data Employee'"
        >
          <template v-slot:icon>
            <i
              class="ni ni-badge text-primary text-sm opacity-10 bg-light py-1 px-2 rounded me-3"
            ></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/dashboard/mesin"
          :class="getRoute() === 'mesin' ? 'active' : 'fs-6 ps-4'"
          :navText="this.$store.state.isRTL ? 'بيانات الماكينة' : 'Data Mesin'"
        >
          <template v-slot:icon>
            <i
              class="ni ni-calendar-grid-58 text-primary text-sm opacity-10 bg-light py-1 px-2 rounded me-3"
            ></i>
          </template>
        </sidenav-item>
      </li>
      <h6
        v-if="this.$store.state.isRTL"
        class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
        :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
      >
        صفحات المرافق
      </h6>
      <h6
        v-else
        class="text-xs ps-4 pt-3 text-uppercase font-weight-bolder opacity-6 text-light"
        :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
      >
        Data History
      </h6>
      <li class="nav-item">
        <sidenav-item
          url="/dashboard/history"
          :class="getRoute() === 'history' ? 'active' : 'fs-6 ps-4'"
          :navText="this.$store.state.isRTL ? 'التاريخ' : 'History'"
        >
          <template v-slot:icon>
            <i
              class="ni ni-watch-time text-primary text-sm opacity-10 bg-light py-1 px-2 rounded me-3"
            ></i>
          </template>
        </sidenav-item>
      </li>
      <div class="pt-3 mx-3 px-1 mb-0 mt-7 sidenav-footer">
        <li class="nav-item">
          <div class="logout-container py-3">
            <a href="#" class="logout sidebar-item active" @click="signOut">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 17L21 12L16 7"
                  stroke="#065AEA"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M21 12H9"
                  stroke="#065AEA"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                  stroke="#065AEA"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span class="ms-4 position-fixed"><b>Logout</b></span>
            </a>
          </div>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";
import SidenavItem from "./SidenavItem.vue";
import SidenavCard from "./SidenavCard.vue";
import d$auth from "@/stores/auth.js";
import { mapActions } from "pinia";

export default {
  name: "SidenavList",
  props: {
    cardBg: String,
  },
  data() {
    return {
      title: "Argon Dashboard 2",
      controls: "dashboardsExamples",
      isActive: "active",
    };
  },
  components: {
    SidenavItem,
    SidenavCard,
    ArgonButton,
  },
  methods: {
    ...mapActions(d$auth, ["a$logout"]),
    signOut() {
      this.a$logout();
      this.$router.replace({ name: "Signin" });
    },
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
  },
};
</script>

<style lang="scss" scoped>
/* Gaya CSS tambahan jika diperlukan */
.logout-container {
  position: fixed;
  bottom: 35px;
  width: 100%;
  max-width: 200px;
  padding: 20px;
  background-color: white;
  border-radius: 20px;
}

.active {
  background-color: white;
  color: black;
}
</style>
