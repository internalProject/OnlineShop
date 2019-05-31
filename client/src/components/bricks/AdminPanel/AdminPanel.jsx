import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles, Button} from '@material-ui/core';
import {Link,} from 'react-router-dom';
import styles from './styles.js';
import UserBtn from '../UserBtn';
import Unregistered from '../Unregistered';


const AdminPanel = props => {
    
    const {classes} = props;

    return <div className={classes.panel}>
        <div className={classes.labelHolder}>
            <h1>Admin Page</h1>
        </div>
        <div className={classes.panelWrapper}>
            <ul className={classes.linkList}>
                <li className={classes.adminLink}>
                    <Link className={classes.link} to="/">Home</Link>
                </li>
                <li className={classes.adminLink}>
                    <Link className={classes.link} to="/product-config">Product Config</Link>
                </li>
                <li className={classes.adminLink}>
                    <Link className={classes.link} to="/user-control">User Control</Link>
                </li>
            </ul>
            <div className={classes.loggedUserShell}>{props.isUserLoggedIn ? <UserBtn/> : <Unregistered/>}</div>
        </div>
    </div>;
}

const mapStateToProps = state => ({
    isUserLoggedIn: state.userReducer.isLoggedIn,
});
const mapDispatchToProps = dispatch => ({});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(AdminPanel);

