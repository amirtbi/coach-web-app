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
            userId:'c3'
        }
    },
    getters:{
        userId(state){
            return state.userId;
        }
    }

})


export default store