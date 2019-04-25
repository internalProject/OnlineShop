import ls from 'local-storage';
import {createUser as saveNewUserToDb} from './helpers.js';

export const getUserData = () => async dispatch => {
    let user = await ls.get('me');
    user = JSON.parse(user);
    dispatch({type: 'GET_USER_DATA', data: user});
};

export const isLoggedIn = () => {
    // TODO check this 
    let name = ls.get('ws-name');
    if (name.length !== undefined && name.length > 1) {
        return ({type: 'USER_IS_LOGGED_IN', data: true});
    }
    return ({type: 'USER_IS_LOGGED_IN', data: false});
}

export const createUser = user => async dispatch => {
    let data = await saveNewUserToDb(user);
    dispatch({type: 'CREATE_NEW_USER', data: data});
}
