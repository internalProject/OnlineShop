const cart = {
    picked: [],
}

const cartReducer = (state = cart, action) => {
    switch(action.type){
        case 'PICK_ONE':
            return {...state, picked: [...state.picked].concat(action.data)}
    }
    return state;
}

export default cartReducer;