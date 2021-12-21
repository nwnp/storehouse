import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../views"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "/dashboard",
        component: () => import("../views/dashboard/index.vue"),
      },
      {
        path: "/department",
        component: () => import("../views/department/index.vue"),
      },
      {
        path: "/user",
        component: () => import("../views/user/index.vue"),
      },
      {
        path: "/device",
        component: () => import("../views/device/index.vue"),
      },
    ],
  },
  {
    path: "*",
    component: () => import("../components/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
