import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core';
import Header from '../Header';
import OrdersGrid from '../OrdersGrid';
import styles from './styles.js';

const UserOrders = props => {
    const {classes} = props;

    return (<div className={classes.page}>
        <Header />
        <OrdersGrid />
    </div>);
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(UserOrders);

