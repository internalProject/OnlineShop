import {ping} from './helpers.js';

export const openInfo = msg => dispatch =>  {
    dispatch({type: 'OPEN_INFO', data: {message: msg}},);
}

export const closeInfo = () => dispatch => {
    dispatch( { type: 'CLOSE_INFO', data: {message: '',} } );
}

export const pingServer = () => dispatch => {
    ping();
}