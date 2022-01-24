import getters from "./usersGetters.js";
import mutations from "./usersMutations.js";
import actions from "./usersActions.js";

export default {
  namespaced: true,
  state() {
    return {
      userIsValid: null,
      userIsAuth: null,
      validLogin:null,
      error:null,
      users: [],
    };
  },
  getters: getters,
  mutations: mutations,
  actions: actions,
};
