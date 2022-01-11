import getters from "./usersGetters.js";
import mutations from "./usersMutations.js";
import actions from "./usersActions.js";

export default {
    namespaced:true,
  state() {
    return {
      userIsValid:null,  
      users: [
        {
          userType: "user",
          userId: new Date().toISOString(),
          userName: "torabi",
          email: "torabi46@gmail.com",
        },
        {
            userType: "coach",
            userId: new Date().toISOString(),
            userName: "Emadi",
            email: "emadi@gmail.com",
          },
      ],
    };
  },
  getters: getters,
  mutations: mutations,
  actions: actions,
};
