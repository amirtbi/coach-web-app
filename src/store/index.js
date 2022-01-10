import {createStore} from 'vuex';

import coachesModule from './modules/coaches/store.js';
import requestsModule from './modules/requests/store.js';

const store = createStore({
    
    modules:{
        coach:coachesModule,
        request:requestsModule
    },
    state(){
        return{
            userId:'c5', // Id of logged coach
            newUser:'c4',
            activeCoachId:'c2',
            error: null,
        }
    },
    getters:{
        userId(state){
            return state.userId;
        },
        newUser(state){
            return state.newUser;
        },
        activeCoach(state){
            return state.activeCoachId;
        }
    }

})


export default store