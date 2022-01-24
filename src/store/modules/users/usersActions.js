import axios from "axios";

const setAuth = (payLoad, users) => {
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

const userValidation = async (enteredData) => {
  const response = await axios({
    url: "https://coach-app-c1d0e-default-rtdb.firebaseio.com/users.json",
    method: "GET",
  });

  const responseData = await response.data;

  const fetchedUsers = [];
  for (const key in responseData) {
    const user = {
      id: key,
      email: responseData[key].email,
      password: responseData[key].password,
      username: responseData[key].userName,
    };
    fetchedUsers.push(user);
  }

  // camparing data using server
  const user = fetchedUsers.find((user) => {
    return (
      user.email === enteredData.email && user.password === enteredData.password
    );
  });
  return user;
};

export default {
  async login(context, payLoad) {
    const requestedInfo = {
      email: payLoad.email,
      userName: payLoad.username,
      password: payLoad.password,
    };

    // user-validation
    try{

      const userLogged = await userValidation(requestedInfo);
      console.log(userLogged);
      if (userLogged) {
        context.commit("setValidation", true);
      } else {
        return;
      }
    }
    catch(error){
      context.state.error = error.message;
    }
    
    
    
  },
  logout(context) {
    context.commit("setValidation", false);
    context.commit("setAuth");
  },

  async registerUser(context, payLoad) {
    const newUser = {
      userName: payLoad.username,
      email: payLoad.email,
      password: payLoad.password,
    };

    // adding new user to userList in server
    const response = await axios({
      url: "https://coach-app-c1d0e-default-rtdb.firebaseio.com/users.json",
      method: "POST",
      data: newUser,
    });

    const responseData = response.data;
    console.log(response);
    if (response.statusText != "OK") {
      console.log("Something went wrong!");
    }

    context.commit("addNewUser", newUser);
  },
};
