export default{
    addNewCoach(state,payLoad){
        state.coaches.push(payLoad);
    },
    setCoach(state,payLoad){
        state.coaches = payLoad;
    }
}