import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home/index.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/Main.vue"),
    children: [
      {
        path: "video",
        name: "video",
        component: () => import("@/views/Asset/video.vue"),
      },
      {
        path: "application",
        name: "application",
        component: () => import("@/views/InstApplication"),
      },
      {
        path: "inst-type",
        component: () => import("@/views/Inst/TypeManage.vue"),
      },
    ],
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
