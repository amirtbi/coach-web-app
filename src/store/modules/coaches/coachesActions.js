import axios from "axios";

export default {
  async register(context, payLoad) {
    console.log("adding new coaches");
    //  const userId = context.rootGetters.newUser;
    const userId = 'c3';
 

    // Storing dataform in firebase database,
    // using fetch api
    // const response = await fetch(
    //   `https://coach-app-c1d0e-default-rtdb.firebaseio.com/coaches/${userId}.json`,
    //   {
    //     method: "PUT",
    //     body: JSON.stringify(payLoad),
    //   }
    // );
    // sending using Axios

    const response = await axios({
        method:'PUT',
        url:`https://coach-app-c1d0e-default-rtdb.firebaseio.com/coaches/${userId}.json`,
        data:payLoad
    })
    //const responseData = await response.json();
    if (!response.statusText === 'ok') {
      // error
    }
    const newCoach = {
      ...payLoad,
      id: userId,
    };
    context.commit("addNewCoach", newCoach);
  },


  // Load coaches from firebase
  async loadCoaches(context,payLoad) {

    // Check if fetch data is not needed!
    if(!payLoad.forceRefresh && !context.getters.shouldUpdate){
      console.log("Not neeeded refresh");
      return;
    }
    // Else, load data from serve
    // Getting data from firebase
    const baseUrl =
      "https://coach-app-c1d0e-default-rtdb.firebaseio.com/coaches.json";

    const response = await axios.get(baseUrl);

    // Waiting for json object
    // In case of using fetch Api
    // const responseData = await response.json();
    // Getting data using Axios
    const responseData = await response.data;

    // In case of using fetch Api, statusText changes into (response.ok)
    // if(!response.ok){//}
    if (!response.statusText === "ok") {
      const error = new Error(error.message || "fetching went wrong!");
      throw error;
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
    context.commit('setFetchTimeStamp');
  },
};
