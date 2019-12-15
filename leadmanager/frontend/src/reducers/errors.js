import {GET_ERRORS} from '../actions/types'

const initialState = {
    status:null,
    msg:{}
}
export default (state = initialState,action)=>{
    switch(action.type){
        case GET_ERRORS:{
            return {
                status:action.payload.status,
                msg:action.payload.msg
            }
        }
        default:return state
    }
}