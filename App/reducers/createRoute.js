
import { CREATE_ROUTE } from '../actions/actionTypes';

const initialState = {};

export default function createRoute(state=initialState, action){

    switch (action.type) {
        case CREATE_ROUTE.ROUTE_NAME_INIT:
            return{
                ...state,
                ...action.data
            }
        default:
            return state;
    }
}