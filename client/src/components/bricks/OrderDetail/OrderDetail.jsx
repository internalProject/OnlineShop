import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core';
import styles from './style.js';
import cn from 'classnames';
import {Image, Transformation, } from 'cloudinary-react';

const dateToPropperFormat = date => {
    return  date.replace('T', '   ').slice(0, date.indexOf('.'));
}

const  OrderDetail = props => {
    const {classes, order} = props;

    return (<div className={classes.order}>    
        <div className={classes.orderHeader}>
            <div className={classes.dateStamp}>{dateToPropperFormat(order.date)}</div>
            <div className={classes.orderHeaderText}>Order ID: {order.id}</div>
        </div>
        <div>
            <ol>
                {
                    order.products.map( p => 
                        <li className={classes.itemRow} key={p.product.id}>
                            <div style={{display: 'flex'}}>
                                <div style={{flexGrow: '3'}}>
                                    <div className={classes.pair}>
                                        <div className={classes.fieldName}>Product ID:   </div>
                                        <div className={classes.fieldValue}>{p.product.id}</div>
                                    </div>
                                    <div className={classes.pair}>
                                        <div className={classes.fieldName}>Product Name:   </div>
                                        <div className={classes.fieldValue}>{p.product.name}</div>
                                    </div>
                                    <div className={classes.pair}>
                                        <div className={classes.fieldName}>Quantity:   </div>
                                        <div className={classes.fieldValue}>{p.quantity}</div>
                                    </div>
                                </div>
                                <div>
                                    <Image style={{height: '80px', margin: '20px'}} cloudName="zelos" publicId={`military/${p.product.name}`} />
                                </div>
                            </div>
                            <div className={classes.pair}>
                                <div className={classes.fieldName} style={{width: '30%'}}>Product description:   </div>
                                <div className={cn(classes.itemDescriptionShell, classes.fieldValue)} style={{width: '70%'}}>
                                    <div className={classes.itemDescription}>{p.product.description}</div>
                                </div>
                            </div>

                        </li>
                    )
                }
            </ol>
        </div>
    </div>);
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(OrderDetail);

