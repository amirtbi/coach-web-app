export default {
  addMessage(state, payLoad) {
    state.requests.push(payLoad);
  },

  setRequests(state, payLoad) {
    state.requests = payLoad;
    // console.log("requests:",state.requests);
  },
};
