import React from 'react';
import {compose} from 'redux';
import { withStyles } from '@material-ui/core';
import Nav from '../Nav';
import {Link} from 'react-router-dom';
import styles from './styles.js';

const Header = props => {
    
    const {classes} = props;

        return  (<header className={classes.header}>
            <h1 className={classes.title}><Link className={classes.mainLink} to="/">Military Shop</Link></h1>
            <Nav/>
        </header>);
}

export default compose(
    withStyles(styles)
)(Header);
