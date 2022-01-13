import getters from "./usersGetters.js";
import mutations from "./usersMutations.js";
import actions from "./usersActions.js";

export default {
    namespaced:true,
  state() {
    return {
      userIsValid:null,  
      userIsAuth:null,
      users: [
        {
          userType: "user",
          userId: new Date().toISOString(),
          userName: "torabi",
          email: "torabi46@gmail.com",
          password:'123456'
        },
        {
            userType: "coach",
            userId: new Date().toISOString(),
            userName: "Emadi",
            email: "emadi@gmail.com",
            password:"ghafalankuh"
          },
      ],
    };
  },
  getters: getters,
  mutations: mutations,
  actions: actions,
};
