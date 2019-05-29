import React from 'react';
import reactDOM from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import {routerReducer} from 'react-router-redux';
import App from './components/App.jsx';
import {ctrlReducer} from './reducers/ctrlReducer.js';
import userReducer from './reducers/userReducer.js';
import cartReducer from './reducers/cartReducer.js';
import adminReducer from './reducers/adminReducer.js';

const store = createStore(
    combineReducers({
        ctrlReducer,
        userReducer,
        cartReducer,
        adminReducer,
        'router': routerReducer
    }),
    composeWithDevTools(applyMiddleware(
        ...[thunkMiddleware]
    ))
)

reactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)