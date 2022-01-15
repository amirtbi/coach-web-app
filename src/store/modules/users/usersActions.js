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

const userValidation = async (users,enteredData)=>{
  const response = await axios({
    url: "https://coach-app-c1d0e-default-rtdb.firebaseio.com/users.json",
    method: "GET",
  });

  const responseData = await response.data;

  const fetchedUsers = [];
  for(const key in responseData){
    const user = {
      id:key,
      email:responseData[key].email,
      password:responseData[key].password,
      username :responseData[key].userName
    }
    fetchedUsers.push(user);
  }

  const userIndex = users.findIndex(user=>{
    return user.
  })
  return fetchedUsers;
};

export default {
  
  async login(context, payLoad) {
    const requestedInfo = {
      email: payLoad.email,
      userName: payLoad.username,
      password: payLoad.password,
    };

    const users = this.getters['users/users'];  
    // user-validation
    const userIndex = await userValidation(users,requestedInfo);

    console.log("fetcher users",userIndex);
  

    if(context.getters['users/hasUsers']){
      const userIsAuth = setAuth(requestedInfo, users); // return true if isAuth
      context.commit("setValidation", userIsAuth);
      requestedInfo.isAuth = userIsAuth;
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
