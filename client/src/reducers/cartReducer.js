const cart = {
    picked: [],
}

const cartReducer = (state = cart, action) => {
    switch(action.type){
        case 'PICK_ONE':
            return {...state, picked: action.data}
    }
    return state;
}

export default cartReducer;