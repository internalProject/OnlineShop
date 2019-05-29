import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core';
import {Redirect, } from 'react-router';
import Header from '../Header';
import OrdersGrid from '../OrdersGrid';
import styles from './styles.js';

const UserOrders = props => {
    const {classes} = props;

    return props.isLoggedIn ? (<div className={classes.page}>
        <Header />
        <OrdersGrid />
    </div>) : <Redirect to="/" />
}

const mapStateToProps = state => ({
    isLoggedIn: state.userReducer.isLoggedIn,
});
const mapDispatchToProps = dispatch => ({});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(UserOrders);

