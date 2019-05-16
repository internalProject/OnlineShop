import axios from 'axios';

const pulsar = axios.create({
    baseURL: 'https://localhost:3000/',
    timeout: 3000,
    headers: {'Content-Type': 'application/json'}
});

export const createUser = async user => {
    // let result = await axios.post('/sign-up', user)
    // .then(s => s.data)
    // .catch(e => console.log('bad response from server to client',e));
    // return result;
    
    let serverResponse = await axios.post('/sign-up', user);
    return serverResponse;
}

export const checkUserInDB = async usersCreds => {
    let serverResponse = await axios.post('/sign-in', usersCreds);
    return serverResponse;
}

export const getUserDataFromDb = async userName => {
    let serverResponse = await axios.post('/user-data', {name: userName});
    return serverResponse;
}