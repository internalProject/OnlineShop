import axios from 'axios';
import urls from '../urlConstants.js';

const pulsar = axios.create({
    baseURL: urls.BASE_URL,
    timeout: 3000,
    headers: {'Content-Type': 'application/json'}
});

export const createUser = async user => {
    // let result = await axios.post('/sign-up', user)
    // .then(s => s.data)
    // .catch(e => console.log('bad response from server to client',e));
    // return result;
    
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
