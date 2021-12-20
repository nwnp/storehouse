import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Test from "../views/Test.vue";
import TestEvent from "../views/TestEvent.vue";
import Computed from "../views/TestComputed.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/test",
    name: "Test",
    component: Test,
  },
  {
    path: "/test",
    name: "Test",
    component: Test,
  },
  {
    path: "/test-event",
    component: TestEvent,
  },
  {
    path: "/computed",
    component: Computed,
  },
  {
    path: "/test-condition",
    component: () => import("../views/TestCondition.vue"),
  },
  {
    path: "/test-loop",
    component: () => import("../views/TestLoop.vue"),
  },
  {
    path: "/test-mixin",
    component: () => import("../views/TestMixin.vue"),
  },
  {
    path: "/test-bootstrap",
    component: () => import("../views/TestBootstrap.vue"),
  },
  {
    path: "/test-comp",
    component: () => import("../views/comp/index.vue"),
  },
  {
    path: "*", // NotFound 설정을 위한 path(*)는 반드시 맨 하단에 위치해야 함
    component: () => import("../components/NotFound.vue"),
  },
  {
    path: "/test-family/props",
    component: () => import("../views/family/props/Parent.vue"),
  },
  {
    path: "/test-family/emit/",
    component: () => import("../views/family/emit/Parent.vue"),
  },
  {
    path: "/test-family/event-bus",
    component: () => import("../views/family/eventBus/Parent.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
