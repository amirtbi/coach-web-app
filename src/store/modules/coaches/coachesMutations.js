export default{
    addNewCoach(state,payLoad){
        
        state.coaches.push(payLoad);
    },
    setCoach(state,payLoad){
        state.coaches = payLoad;
        console.log("all coaches:",state.coaches);
    },
    setFetchTimeStamp(state){
        // Set last fetch time
        state.lastFetch = new Date().getTime();
    }

}