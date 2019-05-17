import ls from 'local-storage';
import {createUser as saveNewUserToDb, checkUserInDB, getUserDataFromDb} from './helpers.js';

// export const getUserData = () => async dispatch => {
//     let user = await ls.get('me');
//     user = JSON.parse(user);
//     dispatch({type: 'GET_USER_DATA', data: user});
// };

export const isLoggedIn = () => async dispatch => {
    let name = ls.get('ws-name');
    // let name = localStorage.getItem('ws-name');
    if (name && name.length !== undefined && name.length > 1) {
        let serverResponse = await getUserDataFromDb(name);
        let user = JSON.parse(serverResponse.data);
        user = user.user.dataValues;
        return ({type: 'USER_IS_LOGGED_IN', data: {isLoggedIn: true, user}});
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
    // localStorage.removeItem('ws-name');
    dispatch({
        type: 'EXIT',
        data: false,
    })
}

export const tryToLogin = userCredentials => async dispatch => {
    let serverResponse = await checkUserInDB(userCredentials);
    if (serverResponse.data === 'Wrong email.') {
        dispatch({type: 'USER_IS_NOT_EXISTS'});
    }
    let user = JSON.parse(serverResponse.data);
    
    if (user.wrongPassword) {
        dispatch({type: 'WRONG_PASSWORD'});
    }
    if (user.isUserExists === true) {
        dispatch({type: 'USER_IS_EXISTS', data: {user: user, isLoggedIn: true}});
        ls.set('ws-name', user.user.name);
    } else {
        dispatch({type: 'USER_IS_NOT_EXISTS'});
    }
    
}

export const getUserData = userName => async dispatch => {
    let serverResponse = await getUserDataFromDb(userName);
    let user = JSON.parse(serverResponse.data);
    user = user.user.dataValues;
    dispatch({type: 'GET_USER_DATA_FROM_SERVER', data: user});
}