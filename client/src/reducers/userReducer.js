import {dateToPropperFormat} from '../actions/helpers.js';

const initialUserState = {
    user: {
        id: null,
        name: '',
        email: '',
        address: '',
        password: '',
        roleId: '',
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
    stuff: [],
    
}

const userReducer = (state = initialUserState, action) => {
    switch(action.type) {
        case 'CREATE_NEW_USER':
            return {
                ...state,
                serverData: action.data,
                registerCounter: ++state.registerCounter,
                user: {...state.user, name: action.data.data.name,
            }};
        case 'USER_IS_LOGGED_IN':
            return {...state, isLoggedIn: action.data.isLoggedIn, user: {...action.data.user}};
        case 'USER_HAS_REGISTRED':
            return {...state, isLoggedIn: action.data};
        case 'EXIT':
            return {...state,
                isLoggedIn: action.data,
                userSearchingResult: {
                    hasUserFound: false,
                    message: '',
                },
            };
        case 'USER_IS_EXISTS':
            return {
                ...state,
                user: {...state.user, ...action.data.user.user},
                isLoggedIn: action.data.isLoggedIn,
                userSearchingResult: {message: 'Welcome!', hasUserFound: true,},
                wrongPassword: false,
            };
        case 'USER_IS_BANNED':
            return {
                ...state,
                user: {...state.user, ...action.data.user.user},
                isLoggedIn: action.data.isLoggedIn,
                userSearchingResult: {message: 'Yor are banned!', hasUserFound: true,},
                wrongPassword: false,
            }
        case 'CLEAR_SIGN_IN_MSG':
            return {...state, userSearchingResult: {...state.userSearchingResult, message: ''}};
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
        case 'AFTER_USER_UPDATE':
            return {...state,
                user: {...action.data, },
                serverData: {...state.serverData,
                    message: `User ${action.data.name} has updated successfully at ${dateToPropperFormat(new Date().toISOString())}.`,
                    status: 'success',
                },
            }
        case 'FAIL_ON_USER_UPDATE':
            return {
                ...state,
                serverData: {
                    message: `User ${action.data.name} has updated successfully at ${dateToPropperFormat(new Date().toISOString())}.`,
                    status: 'fail',
                }
            }
        case 'ADMIN_ACCESS':
            return {...state,
                serverData: {
                    ...state.serverData,
                    hasAdminAccess: action.data,
                },
            }
        case 'ALL_ITEMS':
            return {...state,
                stuff: [...action.data.items]
            }
    }

    return state;
}

export default userReducer;