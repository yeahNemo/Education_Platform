import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const instRoutes = [
  {
    path: "inst-info",
    component: () => import("@/views/Inst/InstInfo.vue"),
  },
  {
    path: "inst-chat",
    component: () => import("@/views/Inst/Chat.vue"),
  },
  {
    path: "video",
    component: () => import("@/views/Asset/video.vue"),
  },
  {
    path: "asset",
    component: () => import("@/views/Asset/index"),
  },
  {
    path: "stu-apply",
    component: () => import("@/views/Inst/StudentApply.vue"),
  },
  {
    path: "stu-list",
    component: () => import("@/views/Inst/StudentList.vue"),
  },
];

const adminRoutes = [
  {
    path: "docs",
    component: () => import("@/views/Asset/docs_old.vue"),
  },
  {
    path: "video",
    component: () => import("@/views/Asset/video.vue"),
  },
  {
    path: "inst-type",
    component: () => import("@/views/Inst/TypeManage.vue"),
  },
  {
    path: "inst-apply",
    component: () => import("@/views/InstApplication"),
  },
];

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register"),
  },
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
    children: [...adminRoutes, ...instRoutes],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
