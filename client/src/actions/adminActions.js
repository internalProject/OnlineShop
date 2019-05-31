import {toAdmin, findItemsByQuery} from './helpers.js';
import { BottomNavigationAction } from '@material-ui/core';

export const getIntoAdmin = adminCreds => async dispatch => {
    let serverResponse = await toAdmin(adminCreds);
    if (serverResponse.status === 200 && serverResponse.data !== null) {
        dispatch({type: 'ADMIN_HAS_LOGGED_IN', data: serverResponse.data,});
    } else {
        dispatch({type: 'ADMIN_HASNT_FOUND', data: serverResponse.data,});
    }
}

export const findItems = query => async dispatch => {
    let serverResponse = await findItemsByQuery(query);
    if (serverResponse.status === 200 && serverResponse.data !== null) {
        dispatch( {type: "SEARCHED_ITEMS", data: serverResponse.data,} );
    } else {
        dispatch( {type: "ITEMS_NOT_FOUND"} );
    }
};