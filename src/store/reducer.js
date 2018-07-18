export let GET_PLAN_LIST = 'GET_PLAN_LIST'
import {combineReducers} from 'redux'

function user(state="",action){
    if(action.type=="update_user"){
        return action.payload
    }else{
        return state
    }
}

function planlist(state=[],action){
    if(action.type==GET_PLAN_LIST){
        return action.payload
    }
    return state
}

let root = combineReducers({
    user:user,
    planlist:planlist
})

function combine(state,actions){
    return {
        user:user(state.user,actions),
        planlist:planlist(state.planlist,actions)
    }
}
export default root