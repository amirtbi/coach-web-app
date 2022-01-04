import axios from "axios";

export default {
  receivedMessages(state, _, rootGetters) {
    const coachId = rootGetters.userId;
    // // Gettting data from server
    // const response = await axios.get(
    //   "https://coach-app-c1d0e-default-rtdb.firebaseio.com/requests.json"
    // );
    // const responseData = await response.data;
    // console.log("receivedMessageData:", responseData);
     return state.requests.filter((req) => req.coachId === coachId);
    //return state.requests
  },
  hasRequest(state, getters) {
    return state.requests && state.requests.length > 0;
  },
};
