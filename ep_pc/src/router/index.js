import { getToken } from "@/utils/auth";
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
    path: "shared-ques-bank",
    component: () => import("@/views/Admin/SharedQuestionBank.vue"),
  },
  {
    path: "plan-type",
    component: () => import("@/views/Admin/PlanTypeManage.vue"),
  },
  {
    path: "/main/shared-asset",
    component: () => import("@/views/Admin/SharedAsset.vue"),
  },
  {
    path: "/admin-inst-info/:instId",
    component: () => import("@/views/Admin/SingleInstInfo.vue"),
    props: true,
  },
  {
    path: "all-inst",
    component: () => import("@/views/Admin/AllInstInfo.vue"),
  },
  {
    path: "file-upload",
    component: () => import("@/views/Asset/FileUpload.vue"),
  },
  {
    path: "inst-type",
    component: () => import("@/views/Admin/InstTypeManage.vue"),
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
    meta: { isPublic: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login"),
    meta: { isPublic: true },
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home/index.vue"),
  },
  {
    path: "/main",
    component: () => import("@/views/Main.vue"),
    children: [...adminRoutes, ...instRoutes],
  },
  {
    name: "404",
    path: "/404.html",
    component: () => import("@/views/Error404.vue"),
    meta: { isPublic: true },
  },
  {
    path: "*",
    redirect: {
      name: "404",
    },
  },
];

const router = new VueRouter({
  routes,
});

// 导航守卫限制路由跳转
router.beforeEach((to, from, next) => {
  if (to.meta.isPublic) {
    // 判断该路由是否需要登录权限
    next();
  } else {
    // console.log("token", getToken());
    if (getToken() !== null) {
      //判断本地是否存在access_token
      next();
    } else {
      next({
        path: "/login",
      });
    }
  }
});

export default router;
