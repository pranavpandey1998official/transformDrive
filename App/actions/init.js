import { AsyncStorage } from 'react-native';

import { AUTH } from './actionTypes';
import Navigation from '../lib/Navigation';
import {URL} from '../constants/server';
import { login } from '../actions/auth';
import { setRoute } from '../actions/route';

export default appInit = () => {
    return async(dispatch, getstate) => {
        try {    
            const token = await AsyncStorage.getItem('token');
            if(!token){
                return Navigation.navigate('Auth');   
            }
            const response = await fetch(URL+'user/data',{
                method: 'POST',
                headers: {
                    Authorization: 'JWT '+token
                }
            });
            if(response.status === 200){
                const user = await response.json();
                dispatch(login(user));
                if(user.routeId) {
                    dispatch(setRoute(user.routeId, user._id));
                }
                return Navigation.navigate('App');
            }
            return Navigation.navigate('Auth'); 
        } catch(e) {
            console.log('app_init', e);
        }
        dispatch();
    }
}