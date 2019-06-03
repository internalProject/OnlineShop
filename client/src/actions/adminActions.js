import {toAdmin, findItemsByQuery, removeItemFromStore, updateProduct} from './helpers.js';

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
        if (serverResponse.data.length === 0) {
            dispatch( {type: "ITEMS_NOT_FOUND"} );
        } else {
            dispatch( {type: "SEARCHED_ITEMS", data: serverResponse.data,} );
        }
    }
};

export const removeItem = itemId => async dispatch => {
    let serverResponse = await removeItemFromStore(itemId);
    if (serverResponse.data.status === 'ok') {
        dispatch( {type: 'ITEM_REMOVED_OK', data: {message: serverResponse.data.message, deletedItemId: itemId,} });
    } else {
        dispatch({ type: 'ITEM_NOT_REMOVED', data: serverResponse.data});
    }

}

export const saveChanges = newData => async dispatch => {
    let serverResponse = await updateProduct(newData);
    if (serverResponse.status === 200) {
        dispatch({type: "PRODUCT_UPDATED_SUCCESSFULLY", data: serverResponse.data[1][0]})
    }
}