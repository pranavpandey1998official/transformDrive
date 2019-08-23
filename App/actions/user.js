import { setRoute } from './route';
import { POST } from '../lib/Api';
import { AUTH } from './actionTypes';

export function updateUserRoute (routeId) {
    return async(dispatch, getState) => {
        const { _id } = getState().auth.user;
        try{
            const user = await POST('user/route', {
                userId: _id,
                routeId
            })
            await dispatch(updateUser(user));
            dispatch(setRoute(routeId));
        }catch(e) {
            console.log('update_user', e);
        }
    }
}

function updateUser(user) {
    return {
        type: AUTH.UPDATE_USER,
        user
    }
}