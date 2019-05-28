import {getAdminData} from './helpers.js';

export const getAdminDataFromServer = adminCreds => async dispatch => {
    let serverResponse = await getAdminData(adminCreds);
    if (serverResponse.status === 200 && serverResponse.data !== null) {
        dispatch({type: 'ADMIN_HAS_LOGGED_IN', data: serverResponse.data,});
    } else {
        dispatch({type: 'ADMIN_HASNT_FOUND', data: serverResponse.data,});
    }
}