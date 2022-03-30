import axios from "axios";

export default {
  logout(context) {
    context.commit("setUser", {
      token: null,
      userId: null,
      tokenExpiration: null,
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

    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
};
