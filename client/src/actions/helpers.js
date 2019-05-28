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

export const getAdminData = async adminData => {
    let admin = await axios.post(urls.GET_ADMIN, adminData);
    return admin;
}