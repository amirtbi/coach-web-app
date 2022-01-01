import actions from './requestsActions.js';
import mutations from './requestsMutations.js';
import getters from './requestsGetters';

export default{
    namespaced:true,
    state(){
        return {
            requests:[]
        }
    },
    getters:getters,
    mutations:mutations,
    actions:actions
}