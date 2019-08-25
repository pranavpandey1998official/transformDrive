import { ROUTE, AUTH } from '../actions/actionTypes';

const initialState = {}
export default function (state = initialState, action) {

    switch(action.type) {
        case AUTH.LOGOUT: 
            return initialState
        case ROUTE.SET:
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}