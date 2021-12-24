import { createRouter, createWebHistory } from "vue-router";

//importing components
import Home from "../views/home.vue";

//routes

const routes = [
  { path: "/", component: Home },
  { path: "/home", name: "home-page", component: Home },
];


const router = new createRouter({
  history: createWebHistory(),
  routes: routes
});

export default router;
