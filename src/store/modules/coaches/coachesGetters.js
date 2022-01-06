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
  // Check if the fetch data is needed
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }

    const currenTime = new Date().getTime(); // Return millisecond
   
    return (currenTime - lastFetch) / 1000 > 60; // return Secomd
  },
};
