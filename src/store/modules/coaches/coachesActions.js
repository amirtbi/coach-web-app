export default {
  async register(context, payLoad) {
    console.log("adding new coaches");
    const userId = context.rootGetters.userId;

    // STORING dataform in firebase database,
    // using fetch api
    const response = await fetch(
      `https://coach-app-c1d0e-default-rtdb.firebaseio.com/coaches/${userId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(payLoad),
      }
    );

    //const responseData = await response.json();
    if (!response.ok) {
      // error
    }
    const newCoach = {
      ...payLoad,
      id: userId,
    };
    context.commit("addNewCoach", newCoach);
  },

  // Load coaches from firebase
  async loadCoaches(context) {

    // Getting data from firebase
    const response = await fetch(
      "https://coach-app-c1d0e-default-rtdb.firebaseio.com/coaches.json"
    );

    // Waiting for json object    
    const responseData = await response.json();
    //console.log(responseData);    
    if (!response.ok) {
      /// error handling
    }

    const coaches = [];
    for (let key in responseData) {
      // Adding the coach  
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        areas: responseData[key].areas,
        hourlyRate: responseData[key].hourlyRate,
      };
      coaches.push(coach);
    }
    context.commit("setCoach", coaches);
  },
};
