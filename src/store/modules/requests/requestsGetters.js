export default {
  receivedMessages(state, _, rootGetters) {
    const coachId = rootGetters.userId;
    return state.requests.filter((req) => req.coachId === coachId);
  },
  hasRequest(state, getters) {
    return getters.receivedMessages && getters.receivedMessages.length > 0;
  },
};
