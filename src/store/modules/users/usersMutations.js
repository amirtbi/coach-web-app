export default{
    setValidation(state,userIsValid){
        state.userIsValid = userIsValid;
    },
    setAuth(state,payLoad){
        state.isAuth = state.userIsValid;
    }
  
 
}