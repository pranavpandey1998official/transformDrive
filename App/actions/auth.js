import { AsyncStorage } from 'react-native';

import { AUTH } from './actionTypes';
import Navigation from '../lib/Navigation';
import {URL} from '../constants/server';
import { setRoute } from './route'

export function loginRequest(params) {
    return async function(dispatch) {
        try {
            //console.log(params);
            const response = await fetch(URL+'user/login',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: params.userName,
                    password: params.password
                })
            })
            if(response.status === 200){
                const user = await response.json();
                // console.log(user);
                await AsyncStorage.setItem('token', user.token);
                await dispatch(setUser(user));
                if(user.routeId) {
                    dispatch(setRoute(user.routeId, user._id));
                }
                await Navigation.navigate('App');
                return;
            }
            console.log(response);
            await dispatch(error('User Credential Incorrect'))
        } catch(e) {
            console.log(e);
        }
    }
}

export function setUser(user) {
    return {
        type: AUTH.LOGIN_SUCCESS,
        user
    }
}

export function logoutRequest() {
    return async function(dispatch) {
        try {
            await AsyncStorage.removeItem('token');
            await dispatch(logout());
            await Navigation.navigate('Auth');
        } catch(e) {
            console.log('logout', e);
        }
    }
}

export function logout() {
    return {
        type: AUTH.LOGOUT
    }
}

export function error(err) {
    return {
        type: AUTH.ERROR,
        error: err
    }
}

export async function signUpRequest(params) {
    try {
        const response = await fetch(URL+'user/signup',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: params.userName,
                email: params.password,
                password: params.password,
                mobile: Number(params.phoneNumber),
                userType: 'driver',
                bank: 0
            })
        })
        if(response.status === 200){
            await Navigation.navigate('SignIn');
        }
    } catch(e) {
        console.log(e);
    }
}
