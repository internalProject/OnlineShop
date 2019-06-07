import {
    toAdmin,
    findItemsByQuery,
    removeItemFromStore,
    updateProduct,
    createNewProduct,
    getUsers,
    switchUserStatus,
    getUserOrdersByAdmin,
} from './helpers.js';

export const getIntoAdmin = adminCreds => async dispatch => {
    let serverResponse = await toAdmin(adminCreds);
    if (serverResponse.status === 200 && serverResponse.data !== null) {
        dispatch({type: 'ADMIN_HAS_LOGGED_IN', data: serverResponse.data,});
    } else {
        dispatch({type: 'ADMIN_HASNT_FOUND', data: serverResponse.data,});
    }
}

export const findItems = searchState => async dispatch => {
    let serverResponse = await findItemsByQuery(searchState);
    if (serverResponse.status === 200 && serverResponse.data !== null) {
        if (serverResponse.data.length === 0) {
            dispatch( {type: "ITEMS_NOT_FOUND"} );
        } else {
            dispatch( {type: "SEARCHED_ITEMS", data: serverResponse.data,} );
        }
    }
};

export const clearSearchResult = () => dispatch => {
    dispatch({type: 'CLEAR_SEARCH_RESULT'});
}

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

export const createrProductInDB = productData => async dispatch => {
    let serverResponse = await createNewProduct(productData);
    if (serverResponse.status === 200) {
        dispatch({type: 'NEW_PRODUCT_CREATED', data: serverResponse.data, });
    } else {
        dispatch({type: 'FAIL_ON_PRODUCT_CREATION', data: serverResponse.data});
    }
}

export const getAllUsers = () => async dispatch => {
    let serverResponse = await getUsers();
    if (serverResponse.status === 200) {
        dispatch({type: 'ALL_USERS', data: serverResponse.data.users, });
    } else;{
        dispatch({type: 'FAIL_ON_GETTING_USERS', data: serverResponse.data,});
    }
}

export const alternateUserStatus = userId => async dispatch => {
    let serverResponse = await switchUserStatus(userId);
    if (serverResponse.status === 200 && serverResponse.data.success ) {
        dispatch({type: 'USER_STATUS_CHANGED', data: serverResponse.data.updatedUser, });
    } else {
        console.log('fail');
    }
}

export const getAllUserOrders = userId => async dispatch => {
    let serverResponse = await getUserOrdersByAdmin(userId);
    if (serverResponse.status === 200 && serverResponse.data.status === 'ok') {
        dispatch({type: 'USER_ORDERS_GOTTEN', data: serverResponse.data.orders, });
    } else {
        console.log('fail');
    }
}
