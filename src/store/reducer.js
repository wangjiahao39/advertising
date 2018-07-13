function user(state="",action){
    if(action.type=="update_user"){
        return action.payload
    }else{
        return state
    }
}

export default user