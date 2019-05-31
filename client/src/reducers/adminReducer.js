import {dateToPropperFormat} from '../actions/helpers.js';

const initialAdmin = {
    admin: {
        id: null,
        email: '',
        password: '',
    },
    serverData: null,
    searchResult: { items: [], },
};

export default function adminReducer(state = initialAdmin, action) {
    switch (action.type) {
        case 'ADMIN_HAS_LOGGED_IN':
            return {...state,
                admin: {...state.admin, ...action.data},
                serverData: {...state.serverData,
                    message: `Welcome, master! (connected by ${dateToPropperFormat(new Date().toISOString())})`,
                    status: 'success',
                },
            };
        case 'ADMIN_HASNT_FOUND':
            return {...state,
                serverData: {...state.serverData,
                    error: action.data,
                    message: `Fail on login. (attempted by ${dateToPropperFormat(new Date().toISOString())})`,
                    status: 'fail',
                },
            }
        case 'SEARCHED_ITEMS':
            return {...state,
                searchResult: {...state.searchResult, ...action.data},
            }
    }
    return state;
}