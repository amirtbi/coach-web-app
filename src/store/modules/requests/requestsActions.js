import axios from "axios";
export default {
  async addMessage(context, payLoad) {
    // Random number
    const rndImage = Math.floor(Math.random() * (4 - 1) + 1); // Between 3 and 1
    // const userId = new Date().toString();
    const newRequest = {
      email: payLoad.email,
      message: payLoad.message,
      profile: `image${rndImage}`,
    };
    const token = context.rootGetters.token;
    // Sending a new request to server
    const response = await axios({
      method: "POST",
      url:
        `https://coach-app-c1d0e-default-rtdb.firebaseio.com/requests/${payLoad.coachId}.json?auth=` +
        token,
      data: newRequest,
    });

    console.log("send contact data:", response);
    // const responseData = await response.data;
    if (!response.statusText === ok) {
      const newError = newError(response.message);
      throw newError;
    }
    // Adding  id and coachId property, after sending requests to server
    newRequest.id = response.name;
    newRequest.coachId = payLoad.coachId;

    context.commit("addMessage", newRequest);
  },

  async loadRequests(context) {
    const token = context.rootGetters.token;
    const coachId = context.rootGetters.userId;
    // const response = await axios.get(
    //   `https://coach-app-c1d0e-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` +
    //     token
    // );

    const response = await axios.get(
      `https://coach-app-c1d0e-default-rtdb.firebaseio.com/requests/${coachId}.json?=auth=` +
        token
    );
    const responseData = await response.data;
    console.log("Requests", responseData);
    // Helper requests object
    const requests = [];
    for (const key in responseData) {
      const request = {
        id: key, // ==> resposne.name
        email: responseData[key].email,
        message: responseData[key].message,
        profile: responseData[key].profile,
        coachId: coachId, // For particular coach which has been logged
      };
      requests.push(request);
    }
    console.log(requests);
    // Set requests array to new values
    context.commit("setRequests", requests);
  },
};
