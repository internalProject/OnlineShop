import ls from 'local-storage';
import {createUser as saveNewUserToDb, checkUserInDB} from './helpers.js';

// export const getUserData = () => async dispatch => {
//     let user = await ls.get('me');
//     user = JSON.parse(user);
//     dispatch({type: 'GET_USER_DATA', data: user});
// };

export const isLoggedIn = () => {
    // TODO check this 
    let name = ls.get('ws-name');
    if (name && name.length !== undefined && name.length > 1) {
        return ({type: 'USER_IS_LOGGED_IN', data: true});
    }
    return ({type: 'USER_IS_LOGGED_IN', data: false});
}

export const createUser = user => async dispatch => {
    let data = await saveNewUserToDb(user);
    dispatch({type: 'CREATE_NEW_USER', data: data});
}

export const userHasRegistred = () => dispatch => {
    dispatch({
        type: 'USER_HAS_REGISTRED',
        data: true
    });
}

export const exit = () => dispatch => {
    ls.remove('ws-name');
    dispatch({
        type: 'EXIT',
        data: false,
    })
}

export const tryToLogin = userCredentials => async dispatch => {
    let serverResponse = await checkUserInDB(userCredentials);
    let user = JSON.parse(serverResponse.data);
    if (user.isUserExists === true) {
        dispatch({type: 'USER_IS_EXISTS', data: {user: user, isLoggedIn: true}});
        ls.set('ws-name', user.user.name);
    } else {
        dispatch({type: 'USER_IS_NOT_EXISTS'});
    }
    
}