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
    const API_KEY = "AIzaSyB0EHwdreOg-ByX5aK02QzYxx_rKWNXM9Y";
    const response = await axios({
      method: "POST",
      url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      data: {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      },
    });

    const responseData = await response.data;
    console.log(responseData);
    if (response.status != 200) {
      const error = new Error(responseData.error || "Please check your entry");
      throw error;
    }
    console.log(response);
    console.log(responseData);
    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
  async signup(context, payLoad) {
    const API_KEY = "AIzaSyB0EHwdreOg-ByX5aK02QzYxx_rKWNXM9Y";
    // const API_KEY = state.API_KEY;
    // Send http request...
    const response = await axios({
      method: "POST",
      url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      data: {
        email: payLoad.email,
        password: payLoad.password,
        returnSecureToken: true,
      },
    });

    const responseData = await response.data;
    console.log(responseData);
    if (response.status != 200) {
      const error = new Error(responseData.error || "Please check your entry");
      throw error;
    }
    console.log(response);
    console.log(responseData);
    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
};
