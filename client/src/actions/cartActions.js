import ls from 'local-storage';
import {makeOrder as createOrder} from '../actions/helpers.js';

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

export const makeOrder = order => async dispatch => {
    let requestOrderStatus = await createOrder(order);
    if (requestOrderStatus.status === 200)
        dispatch({type: 'MAKE_ORDER', data: {orderIsAccepted: true,}});
    else 
        dispatch({type: 'MAKE_ORDER', data: {orderIsAccepted: false, error: requestOrderStatus}});
}

export const clearCart = () => dispatch => {
    dispatch({type: 'CLEAR_CART'});
}