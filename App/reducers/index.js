import { combineReducers } from 'redux';

import auth from './auth';
import createRoute from './createRoute';
import route from './route';

export default combineReducers({
    auth,
    createRoute,
    route
})