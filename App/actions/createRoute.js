import { CREATE_ROUTE } from './actionTypes';

export function routeNamingInit(params) {
    return {
        type: CREATE_ROUTE.ROUTE_NAME_INIT,
        data: params,
    }
}