import Vue from "vue";
import VueMeta from "vue-meta";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);
Vue.use(VueMeta);

const routes: Array<RouteConfig> = [
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "*",
    name: "catch-all",
    redirect: "/home"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
