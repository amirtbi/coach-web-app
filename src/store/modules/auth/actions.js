import axios from "axios";
let timer;
export default {
  logout(context) {
    // Removing from localstorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");
    clearInterval(timer);

    context.commit("setUser", {
      token: null,
      userId: null,
    });
  },
  async login(context, payload) {
    context.dispatch("auth", payload);
  },
  async signup(context, payLoad) {
    context.dispatch("auth", payLoad);
  },

  async auth(context, payload) {
    const API_KEY = "AIzaSyB0EHwdreOg-ByX5aK02QzYxx_rKWNXM9Y";
    let url = "";
    if (payload.mode === "login") {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    } else if (payload.mode === "signup") {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    }

    // Sending request
    const response = await axios({
      method: "POST",
      url: url,
      data: {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      },
    });

    const responseData = await response.data;

    if (response.status != 200) {
      const error = new Error(responseData.error || "Please check your entry");
      throw error;
    }

    // const expiresIn = +responseData.expiresIn * 1000;
    const expiresIn = 5000;

    const tokenExpirationDate = new Date().getTime() + expiresIn;

    timer = setTimeout(() => {
      console.log("logout...");
      context.dispatch("logout");
    }, expiresIn);

    // Storing logging user in localstorage
    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("tokenExpiration", tokenExpirationDate);
    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },
  autoLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch("logout");
    }, expiresIn);
    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
      });
    }
  },
};
