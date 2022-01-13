
const setAuth = (payLoad,users)=> {
  const userIsValid = users.findIndex((user) => {
    if (
      user.email === payLoad.email &&
      user.password === payLoad.password &&
      user.userName === payLoad.userName
    ) {
      return true;
    }
    return false;
  });
  if (userIsValid > -1) {
    return true;
  } else {
    return false;
  }
};

export default {
  
  login(context,payLoad) {
    const requestedInfo = {
      email: payLoad.email,
      userName: payLoad.username,
      password: payLoad.password,
    };

    // user-validation
    const Users = context.getters.allUsers;

    const userIsAuth = setAuth(requestedInfo,Users); // return true if isAuth
    
    context.commit('setValidation',userIsAuth);
    requestedInfo.isAuth = userIsAuth;
    console.log(requestedInfo);
    
  },
  logout(context){
    context.commit("setValidation",false);
    context.commit("setAuth",false);
  }
};
