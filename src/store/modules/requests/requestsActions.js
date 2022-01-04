import axios from "axios";
export default {
  async addMessage(context, payLoad) {
    const userId = new Date().toString();
    const newRequest = {
      // id:new Date().toString(),
      email: payLoad.email,
      coachId: payLoad.coachId,
      message: payLoad.message,
    };
    // Sending a new request to server
    const response = await axios({
      method: "PUT",
      url: `https://coach-app-c1d0e-default-rtdb.firebaseio.com/requests/${userId}.json`,
      data: newRequest,
    });

    const responseData = await response.data;
    if (!response.statusText === ok) {
      // Error message
    }
    const request = {
      ...newRequest,
      id: userId,
    };
    context.commit("addMessage", request);
  },

  async loadRequests(context){

    const coachId = context.rootGetters.userId;
    const response = await axios.get(
        "https://coach-app-c1d0e-default-rtdb.firebaseio.com/requests.json"
      );
    console.log('loaded requests',response.data);
    const responseData = response.data;
    
    const requests = [];
    for(let key in responseData){
        const request = {
            id:key,
            message:responseData[key].message,
            coachId:responseData[key].coachId,
            email:responseData[key].email
        }
        requests.push(request);
    }
    
    context.commit('setRequests',requests);
  }
};
