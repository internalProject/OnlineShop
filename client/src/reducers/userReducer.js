const initialUserState = {
    user: {
        name: '',
        email: '',
        password: '',
    },
    isLoggedIn: false,
    serverData: null,
    userSearchingResult: {
        hasUserFound: false,
        message: '',
    },
    registerCounter: 0,
    // long: 0
}

const userReducer = (state = initialUserState, action) => {
    switch(action.type) {
        // case 'GET_USER_DATA':
        //     return {
        //         ...state,
        //         user: {...action.data},
        //     };
        case 'CREATE_NEW_USER':
            return {...state, serverData: action.data, registerCounter: ++state.registerCounter};
        case 'USER_IS_LOGGED_IN':
            return {...state, isLoggedIn: action.data};
        case 'USER_HAS_REGISTRED':
            return {...state, isLoggedIn: action.data};
        case 'EXIT':
            return {...state, isLoggedIn: action.data};
        case 'USER_IS_EXISTS':
            return {...state, user: {...action.data.user}, isLoggedIn: action.data.isLoggedIn, userSearchingResult: {message: 'Welcome!', hasUserFound: true,},};
        case 'USER_IS_NOT_EXISTS':
            return {...state, userSearchingResult:{message: 'User hasn\'t found!\nOr entered email/password are wrong.', hasUserFound: false,}};
    }

    return state;
}

export default userReducer;