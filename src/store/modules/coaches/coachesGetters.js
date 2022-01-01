export default {
   coaches(state) {
    return state.coaches;
  },

  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  // Check if the logged user is whether coach or not
  isCoach(_, getters, _2, rootGetters) {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    // return true, if at least one coach meets the condition
    return coaches.some((coach) => coach.id === userId);
  },
};
