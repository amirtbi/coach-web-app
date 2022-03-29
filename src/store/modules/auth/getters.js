export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  userId(state) {
    return state.userId;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
};
