export default{
    setValidation(state,userIsValid){
        state.userIsValid = userIsValid;
    },
    setAuth(state){
        state.isAuth = state.userIsValid;
    },
    addNewUser(state,payLoad){
        state.users.push(payLoad);
    },
    validation(state){
        state.validLogin = true; 
    }
  
 
}