import store from "../store/index.js";

import { createRouter, createWebHistory } from "vue-router";

//importing components
//import Home from "../views/home.vue";

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
// Auth user
import UserAuth from "../views/auth/UserAuth.vue";
//routes

const routes = [
  { path: "/", component: CoachesList },
  { path: "/coaches", component: CoachesList, name: "coaches-list" },
  {
    path: "/coaches/:id",
    component: CoachDetails,
    props: true,
    children: [
      {
        path: "contact",
        component: ContactCoach,
      },
    ],
  },
  {
    path: "/register",
    component: coachRegisteration,
    meta: { requiresAuth: true },
  },
  {
    path: "/request",
    component: RequestReceived,
    meta: { requiresAuth: true },
  },
  { path: "/auth", component: UserAuth, meta: { requiresUnAuth: true } },
  { path: "/:notFound(.*)", component: notFound },

  // { path: "/userSignup", name: "Signup-page", component: UserSignup },
];

const router = new createRouter({
  history: createWebHistory(),
  routes: routes,
  linkActiveClass: "router-link-active",
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  const userIsLogged = store.getters.isAuthenticated;
  if (to.meta.requiresAuth && !userIsLogged) {
    next("/auth");
  } else if (to.meta.requiresUnAuth && userIsLogged) {
    next("/coaches");
  } else {
    next();
  }
});

export default router;
