import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const instRoutes = [
  {
    path: "ques-bank",
    component: () => import("@/views/Inst/QuestionBank.vue"),
  },
  {
    path: "inst-schedule",
    component: () => import("@/views/Inst/Schedule.vue"),
  },
  {
    path: "inst-info",
    component: () => import("@/views/Inst/InstInfo.vue"),
  },
  {
    path: "inst-chat",
    component: () => import("@/views/Inst/Chat.vue"),
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
    path: "file-upload",
    component: () => import("@/views/Asset/FileUpload.vue"),
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
