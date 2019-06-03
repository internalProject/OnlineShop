import {dateToPropperFormat} from '../actions/helpers.js';

const initialAdmin = {
    admin: {
        id: null,
        email: '',
        password: '',
    },
    serverData: null,
    searchCounter: 0,
    itemRemoveCounter: 0,
    productEdited: 0,
    searchResult: { items: [], message: '',},
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
                searchResult: {...state.searchResult, items: [...action.data]},
            }
        case 'ITEMS_NOT_FOUND': 
            return {
                ...state, searchResult: {
                    ...state.searchResult,
                    message: 'There are no items with these names.',
                },
                searchCounter: ++state.searchCounter,
            }
        case 'ITEM_REMOVED_OK':
            return {
                ...state,
                serverData: {
                    ...state.serverData,
                    ...action.data,
                    message: "Item removed successfully!",
                    hasItemRemoved: true,
                },
                searchResult: {
                    items: [...state.searchResult.items.filter(item => {
                        if (item.id === action.data.deletedItemId) return false;
                        return true;
                    } )],
                },
                itemRemoveCounter: ++state.itemRemoveCounter,
            }
        case 'ITEM_NOT_REMOVED':
            return {
                ...state,
                serverData: {
                    ...state.serverData,
                    ...action.data,
                    hasItemRemoved: false,
                    message: 'Item has not deleted.',
                },
            }
        case 'PRODUCT_UPDATED_SUCCESSFULLY': {
            let updatedItems = state.searchResult.items.filter(
                item => {
                    if (item.id === action.data.id) return false;
                    return true;
                });
            updatedItems.push(action.data);
            return {...state,
                    serverData: {...state.serverData,
                        item: action.data,
                        message: `${action.data.name} product has updated successfully!`,
                    },
                    productEdited: ++state.productEdited,
                    searchResult: {
                        items: [...updatedItems],
                    },
                }   
            }
    }
    return state;
}