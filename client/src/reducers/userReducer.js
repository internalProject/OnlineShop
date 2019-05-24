const initialUserState = {
    user: {
        id: null,
        name: '',
        email: '',
        address: '',
        password: '',
        orders: [],
    },
    isLoggedIn: false,
    serverData: null,
    wrongPassword: false,
    userSearchingResult: {
        hasUserFound: false,
        message: '',
    },
    registerCounter: 0,
    tryToLoginCounter: 0,
    orderStatus: {message: '', error: null,},
    stuff: [
        {id: 1, name: 'guardian', description: '"Steregushchy" - a corvette with guided missile weapons of the Navy of the Russian Federation, the head corvette of the project 20380.'},
        {id: 2, name: 'pakfa', description: 'Su-57 (factory index T-50) is a promising fifth-generation Russian multi-purpose fighter developed by the P.O. Sukhoi Design Bureau in the framework of the PAK FA project (I-21 program); until August 2017, the aircraft was known under the factory index T-50).'},
        {id: 3, name: 'armata', description: 'The T-14 (GBTU Index - Object 148) is the newest Russian main tank with an uninhabited turret based on the Armata universal tracked platform.'},
        {id: 4, name: 'aksu', description: 'The AKS-74U (GRAU Index - 6P26), a shortened version of the AKS74 machine gun, was developed in the late 1970s and early 1980s to arm crews of combat vehicles, aircraft, guns, and paratroopers.'},
        {id: 5, name: 'beretta', description: 'One of the major Italian weapons companies and the oldest weapons company in the world. Its products are in service with the police and the army in many countries around the world, it is widely used for self-defense by civilians.'},
        {id: 6, name: 'glock', description: 'The guns of Gaston Glock\'s design are produced serially from the beginning of the 80s after the victory of this structure in the competition, organized in 1980 by the Austrian army. Currently, they are in service in more than 30 countries.'},
        {id: 7, name: 'skif', description: 'Skif - an experienced Russian self-loading pistol, developed in the late 1990s based on the design of a PM pistol.'},
        {id: 8, name: 'spec-suit', description: 'Just cool uniform.'},
    ],
    
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
            return {...state, isLoggedIn: action.data.isLoggedIn, user: {...action.data.user}};
        case 'USER_HAS_REGISTRED':
            return {...state, isLoggedIn: action.data};
        case 'EXIT':
            return {...state, isLoggedIn: action.data};
        case 'USER_IS_EXISTS':
            return {
                ...state,
                user: {...state.user, ...action.data.user.user},
                isLoggedIn: action.data.isLoggedIn,
                userSearchingResult: {message: 'Welcome!', hasUserFound: true,},
                wrongPassword: false,
            };
        case 'WRONG_PASSWORD':
            return {...state, wrongPassword: true, tryToLoginCounter: ++state.tryToLoginCounter,};
        case 'USER_IS_NOT_EXISTS':
            return {...state, userSearchingResult:{message: 'User hasn\'t found!\n Entered email or password are wrong.', hasUserFound: false,}};
        case 'GET_USER_DATA_FROM_SERVER':
            return {...state, user: {...state.user, ...action.data},};
        case 'GET_ALL_USER_ORDERS':
            return {...state, user: {
                ...state.user,
                orders: [...action.data.data],
            }}
    }

    return state;
}

export default userReducer;