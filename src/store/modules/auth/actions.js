import axios from "axios";

export default {
  login() {},
  async signup(context, payLoad) {
    const API_KEY = "AIzaSyB0EHwdreOg-ByX5aK02QzYxx_rKWNXM9Y";
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
    if (!response.ok) {
      const error = new Error(responseData.error || "Please check your entry");
      throw error;
    }
    console.log(responseData);
    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
};
