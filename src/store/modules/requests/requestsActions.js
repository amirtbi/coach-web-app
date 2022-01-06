import axios from "axios";
export default {
  async addMessage(context, payLoad) {
    // const userId = new Date().toString();
    const newRequest = {
      email: payLoad.email,
      message: payLoad.message,
    
    };
    // Sending a new request to server
    const response = await axios({
      method: "POST",
      url: `https://coach-app-c1d0e-default-rtdb.firebaseio.com/requests/${payLoad.coachId}.json`,
      data: newRequest,
    });

    console.log("send contact data:", response);
    // const responseData = await response.data;
    if (!response.statusText === ok) {
      const newError = newError(response.message);
      throw newError
    }
    // Adding  id and coachId property, after sending requests to server
    newRequest.id = response.name;
    newRequest.coachId = payLoad.coachId;
   
    context.commit("addMessage", newRequest);
  },

  async loadRequests(context) {
    const coachId = context.rootGetters.userId;
    const response = await axios.get(
      `https://coach-app-c1d0e-default-rtdb.firebaseio.com/requests/${coachId}.json`
    );
    console.log("loaded requests", response);
    const responseData = response.data;
     
    // Helper requests object
    const requests = [];
    for(const key in responseData){
      const request = {
        id:key, // ==> resposne.name
        email:responseData[key].email,
        message:responseData[key].message,
        coachId:coachId // For particular coach which has been logged
      }
      requests.push(request);
    }
    // Set requests array to new values
    context.commit("setRequests", requests);
  },
};
