const initialUserState = {
    user: {
        name: '',
        email: '',
        password: '',
    },
    isLoggedIn: false,
    serverData: null,
    // long: 0
}

const userReducer = (state = initialUserState, action) => {
    switch(action.type) {
        case 'GET_USER_DATA':
            return {
                ...state,
                user: {...action.data},
            };
        case 'CREATE_NEW_USER':
            return {...state, serverData: action.data};
        case 'USER_IS_LOGGED_IN':
            return {...state, isLoggedIn: action.data};
    }

    return state;
}

export default userReducer;