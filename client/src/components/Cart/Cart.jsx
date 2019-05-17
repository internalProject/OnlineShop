import React from 'react';
import {compose} from 'redux';
import {withStyles} from '@material-ui/core';
import styles from './styles.js';
import Header from '../bricks/Header';
import Grid from '../bricks/Grid';

const Cart = props => {

    const {classes} = props;

    return (<div className={classes.cartPage}>
        <Header/>
        <Grid/>
    </div>);
}

export default compose(
    withStyles(styles),
)(Cart);

