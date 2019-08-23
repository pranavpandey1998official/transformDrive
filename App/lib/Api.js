import store from './createStore';
import { URL } from '../constants/server';

const getUserToken = () => {
    const state = store.getState();
    return state.auth.user.token;
}

export const POST = async(path, body) => {
    const token = getUserToken();
    if(!token) {
        throw new Error('User Must be logged in');
    }
    const response = await fetch(URL+path,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'JWT '+token
        },
        body: JSON.stringify(body)
    });
    if(response.ok) {
        const data = await response.json();
        return data;
    }
    return response
}

export const GET = async(path, body) => {
    const token = getUserToken();
    if(!token) {
        throw new Error('User Must be logged in');
    }
    const response = await fetch(URL+path,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'JWT '+token
        },
    });
    if(response.ok){
        const data = await response.json();
        return data;
    }
}
