import { createRouter, createWebHistory } from "vue-router";

//importing components
import Home from "../views/home.vue";

//import coache feature
import CoachesList from '../views/coaches/CoachesList.vue';
import CoachDetails from '../views/coaches/CoachDetails.vue';
import coachRegisteration from '../views/coaches/CoachRegisteration.vue';

// import requests feature
import CoachContact from '../views/requests/ContactCoach.vue';
import RequestReceived from '../views/requests/RequestsReceived.vue';
import notFound from '../views/notFound/notFound.vue';

//routes

const routes = [
  { path: "/", redirect: "/coaches" },
  { path: "/coaches", component: CoachesList },
  {
    path: "/coaches/:id",
    component: CoachDetails,
    children: [
      { path: "/contact", component: CoachContact }, // /coaches/c1/contact
    ],
  },
  { path: "/register", component: coachRegisteration },
  { path: "/request", component: RequestReceived },
  { path: "/:notFound(.*)", component: notFound },
  { path: "/", component: Home },
  { path: "/home", name: "home-page", component: Home },
];

const router = new createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
