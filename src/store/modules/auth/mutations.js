export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.didAutologout = false;
  },
  setAutologout(state) {
    state.didAutologout = true;
  },
};
