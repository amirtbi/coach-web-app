export default{
    addMessage(context,payLoad){
        const newRequest = {
            id:new Date().toString(),
            email:payLoad.email,
            coachId:payLoad.coachId,
            message:payLoad.message
        }
        context.commit('addMessage',newRequest);
    }
}