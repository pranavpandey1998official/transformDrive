import { AUTH } from '../actions/actionTypes';

const initialState ={
    isAuthenticated: false,
    user: {},
    error: null
};

export default function login(state = initialState, action) {
    switch (action.type) {
        case AUTH.LOGOUT:
            return initialState;
        case AUTH.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.user,
                error: null   
            }
        case AUTH.ERROR:
            return{
                ...state,
                error: action.error
            }
        case AUTH.UPDATE_USER:
        console.log(action.user);
            return{
                ...state,
                user: {
                    ...state.user,
                    ...action.user,
                }
            }
        default: 
            return state;
    }
     
}