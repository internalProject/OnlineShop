import ls from 'local-storage';

export const pickOne = item => dispatch => {
    dispatch({type: 'PICK_ONE', data: item});
}

export const removeFromCart = itemId => dispatch => {
    dispatch({type: 'REMOVE_FROM_CART', data: itemId});
}

export const grabCartItemsFromLS = () => dispatch => {
    let items = ls.get('ws-cart');
    // let items = localStorage.getItem('ws-cart');
    if (items === null || items === undefined) {
        items = [];
    }

    dispatch({type: 'GRAB_ON_CONNECT', data: items});
}

export const sendRequest = data => async dispatch => {
    
}