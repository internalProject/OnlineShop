export const pickOne = item => dispatch => {
    dispatch({type: 'PICK_ONE', data: item});
}

export const removeFromCart = itemId => dispatch => {
    dispatch({type: 'REMOVE_FROM_CART', data: itemId});
}
