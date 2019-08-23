import { ROUTE } from '../actions/actionTypes';

const initialState = {}
export default function (state = initialState, action) {

    switch(action.type) {
        case ROUTE.SET:
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}