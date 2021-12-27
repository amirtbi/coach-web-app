export default{
    register(context,payLoad){
        console.log("adding new coaches");
        context.commit('addNewCoach',payLoad);
        
    }
}