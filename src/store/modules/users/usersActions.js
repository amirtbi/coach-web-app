const userValidation = (users, enteredInfo) => {
  const userIsVallid = users.findIndex((user) => {
    user.password === enteredInfo.password &&
      user.email === enteredInfo.email &&
      user.userName === enteredInfo.userName;
  });
  if (userIsVallid > -1) {
    return true;
  } else {
    return false;
  }
};

export default {
  login(context, payLoad) {
    const requestedInfo = {
      email: payLoad.email,
      userName: payLoad.username,
    };
    // user-validation
    console.log(context.getters.allUsers);
    context.commit("setValidation", true);

  },
};
