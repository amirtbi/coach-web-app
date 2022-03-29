export default {
  receivedMessages(state) {
    return state.requests;
  },
  hasRequest(state, getters) {
    return getters.receivedMessages && getters.receivedMessages.length > 0;
  },
};
