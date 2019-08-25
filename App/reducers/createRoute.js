
import { CREATE_ROUTE, AUTH } from '../actions/actionTypes';

const initialState = {};

export default function createRoute(state=initialState, action){

    switch (action.type) {
        case AUTH.LOGOUT: 
            return initialState
        case CREATE_ROUTE.ROUTE_NAME_INIT:
            return{
                ...state,
                ...action.data
            }
        default:
            return state;
    }
}