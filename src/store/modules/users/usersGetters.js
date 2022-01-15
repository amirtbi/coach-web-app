export default {
  users(state,getters) {
      if(getters.hasUsers){

          return state.users;
        }else{
            console.log("user is empty");
        }
  },
  userIsValid(state) {
    return state.userIsValid;
  },
  userIsAuth(state) {
    return state.userIsAuth;
  },
  hasUsers(state){
      return state.users && state.users.length >0

  }
};
