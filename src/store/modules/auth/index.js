import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters";

export default {
  state() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null, // Id of logged user/coach
      loggedMessage: [],
    };
  },
  actions: actions,
  getters: getters,
  mutations: mutations,
};
