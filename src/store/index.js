import { createStore } from "vuex";

// Modules
import coachesModule from "./modules/coaches/store.js";
import requestsModule from "./modules/requests/store.js";
import usersModule from "./modules/users/store.js";
import authModule from "./modules/auth/index.js";
const store = createStore({
  modules: {
    coach: coachesModule,
    request: requestsModule,
    users: usersModule,
    authModule,
  },
  state() {
    return {
      newUser: "c4",
      activeCoachId: "c2",
      error: null,
    };
  },
  getters: {
    newUser(state) {
      return state.newUser;
    },
    activeCoach(state) {
      return state.activeCoachId;
    },
  },
});

export default store;
