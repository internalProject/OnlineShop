const cart = {
    picked: [
        {id: 2, quantity: 1, name: 'pakfa', description: 'Su-57 (factory index T-50) is a promising fifth-generation Russian multi-purpose fighter developed by the P.O. Sukhoi Design Bureau in the framework of the PAK FA project (I-21 program); until August 2017, the aircraft was known under the factory index T-50).'},
    ],
}

const cartReducer = (state = cart, action) => {
    switch(action.type){
        case 'PICK_ONE':
            return {...state, picked: action.data};
        case 'REMOVE_FROM_CART': {
            let chosen = [...state.picked];
            let afterRemove = chosen.filter(item => {
                if (item.id === action.data) return false;
                return true;
            });
            return {...state, picked: afterRemove};
        }
    }
    return state;
}

export default cartReducer;