import store from "../store/index.js";

import { createRouter, createWebHistory } from "vue-router";

//importing components
import Home from "../views/home.vue";

//import coache feature
import CoachesList from "../views/coaches/CoachesList.vue";
import CoachDetails from "../views/coaches/CoachDetails.vue";
import coachRegisteration from "../views/coaches/CoachRegisteration.vue";

// import requests feature
import ContactCoach from "../views/requests/ContactCoach.vue";
import RequestReceived from "../views/requests/RequestsReceived.vue";
import notFound from "../views/notFound/notFound.vue";

// import users feature
import Login from "../views/users/Login.vue";
import UserSignup from '../views/users/UserSignup.vue';
//routes

const routes = [
  { path: "/", redirect: "/coaches" },
  { path: "/coaches", component: CoachesList, name: "coaches-list" },
  {
    path: "/coaches/:id",
    component: CoachDetails,
    props: true,
    children: [
      {
        path: "contact",
        component: ContactCoach,
        beforeEnter: (to, from, next) => {
          if (store.getters["users/userIsValid"]) {
            next();
          } else {
            next({ path: "/login" });
          }
        },
      }, // /coaches/c1/contact
    ],
  },
  { path: "/register", component: coachRegisteration },
  {
    path: "/request",
    component: RequestReceived,
    meta: { needsAuth: true },
    beforeEnter: (to, from, next) => {
      if (store.getters["users/userIsValid"]) {
        next();
      } else {
        console.log("You must need to login, firstly");
        next("/login");
      }
    },
  },
  { path: "/:notFound(.*)", component: notFound },
  { path: "/", component: Home },
  { path: "/home", name: "home-page", component: Home },
  { path: "/login", name: "login-page", component: Login },
  { path: "/userSignup", name: "Signup-page", component: UserSignup },
];

const router = new createRouter({
  history: createWebHistory(),
  routes: routes,
  linkActiveClass: "router-link-active",
});

router.beforeEach((to, __2, next) => {
  // to and from are both route objects. must call `next`.
  const userIsLogged = store.getters["users/userIsValid"];
  if (to.meta.needsAuth && userIsLogged) {
    next();
  } else {
    next();
  }
});

export default router;
