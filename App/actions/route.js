import { ROUTE, AUTH } from './actionTypes';
import { POST } from '../lib/Api';

import Navigation from '../lib/Navigation';

export function setRoute(routeId) {
    return async(dispatch, getState) => {
        try {
            const { route } = await POST('routes/data', { routeId });
            await dispatch(setRouteSync(route));
        }catch(e) {
            console.log('get_route', e)
        }
    }
}


function setRouteSync(data) {
    return {
        type: ROUTE.SET,
        data,
    }
}

