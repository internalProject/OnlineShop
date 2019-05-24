import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core';
import styles from './style.js';

const dateToPropperFormat = date => {
    return  date.replace('T', ' ').slice(0, date.indexOf('.'));
}

const  OrderDetail = props => {
    const {classes, order} = props;

    return (<div>    
        <div className={classes.orderHeader}>
            <span className={classes.dateStamp}>{dateToPropperFormat(order.date)}</span>&#32<span>Order Id: {order.id}</span>
        </div>
        <div>
            product list of order
        </div>
    </div>);
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(OrderDetail);

