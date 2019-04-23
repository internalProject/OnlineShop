import ls from 'local-storage';

export const getUserData = () => async dispatch => {
    let user = await ls.get('me');
    user = JSON.parse(user);
    dispatch({type: 'GET_USER_DATA', data: user});
};

export const isLoggedIn = user => {
    if (user.name.length !== undefined && user.name.length > 1) {
        return ({type: 'USER_IS_LOGGED_IN', data: true});
    }
    return ({type: 'USER_IS_LOGGED_IN', data: false});
}
