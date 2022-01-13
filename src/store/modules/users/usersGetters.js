export default{
    

    allUsers(state){
        return state.users;
    },
    coaches(state){
        const coaches = state.users.filter(user=>{
            user.userType === 'coach'
        });
        return coaches;
    },
    users(state){
        const users = state.users.filter(user=>{
            user.userType === 'user';
        });
        return users;
    },
    userIsValid(state){
        return state.userIsValid;
    },
    userIsAuth(state){
        return state.userIsAuth;
    }
}