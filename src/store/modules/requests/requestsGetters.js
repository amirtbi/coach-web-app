import axios from "axios";

export default {
  receivedMessages(state, _, rootGetters) {
    // Id of logged Coach
    const coachId = rootGetters.userId;

    // Return requests for particular coach
    return state.requests.filter((req) => req.coachId === coachId);
  },
  hasRequest(state, getters) {
    return getters.receivedMessages && getters.receivedMessages.length > 0;
  },
};
