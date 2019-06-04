import axios from 'axios';
import urls from '../urlConstants.js';

export const dateToPropperFormat = date => {
    return  date.replace('T', '   ').slice(0, date.indexOf('.'));
}

const pulsar = axios.create({
    baseURL: urls.BASE_URL,
    timeout: 3000,
    headers: {'Content-Type': 'application/json'}
});

export const createUser = async user => {    
    let serverResponse = await axios.post(urls.SIGN_UP, user);
    return serverResponse;
}

export const checkUserInDB = async usersCreds => {
    let serverResponse = await axios.post(urls.SIGN_IN, usersCreds);
    return serverResponse;
}

export const getUserDataFromDb = async userName => {
    let serverResponse = await axios.post(urls.GET_USER_DATA, {name: userName});
    return serverResponse;
}

export const makeOrder = async order => {
    let serverResponse = await axios.post(urls.MAKE_ORDER, order);
    return serverResponse;
}

export const fetchAllUserOrders = async id => {
    let orders = await axios.post(urls.FETCH_ALL_USER_ORDERS, {id});
    return orders;
}

export const updateUserOnServer = async userData => {
    let updatedUser = await axios.post(urls.UPDATE_USER, userData);
    return updatedUser;
}

export const toAdmin = async adminData => {
    let admin = await axios.post(urls.TO_ADMIN, adminData);
    return admin;
}

export const isAdmin = async userId => {
    let serverResponse = await axios.post(urls.TO_ADMIN, userId);
    return serverResponse.data.isAccessAllowed;
}

export const findItemsByQuery = async query => {
    let items = await axios.post(urls.SEARCH_STOCK_ITEMS, {query});
    return items;
}

export const removeItemFromStore = async itemId => {
    let serverResponse = await axios.post(urls.DELETE_PRODUCT_BY_ID, {itemId})
    return serverResponse;
}

export const updateProduct = async newData => {
    let serverResponse = await axios.post(urls.UPDATE_PRODUCT, newData);
    return serverResponse;
}

export const createNewProduct = async productData => {
    let serverResponse = await axios.post(urls.CREATE_NEW_PRODUCT, productData);
    return serverResponse;
}