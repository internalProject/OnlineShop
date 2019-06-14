import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';
import UserBtn from '../UserBtn';
import Unregistered from '../Unregistered';
// import {isLoggedIn} from '../../../actions/userActions.js';
// import {grabCartItemsFromLS} from '../../../actions/cartActions.js';
import styles from './styles.js';

class Nav extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount = () => {
        // this.props.checkUserLoginStatus();
        // this.props.grabCartItemsFromLS();
    }

    componentDidUpdate = () => {
        
    }

    render = () => {
        const {classes} = this.props;

        return (<div className={classes.navBar}>
        <ul className={classes.navLinks}>
            <li className={classes.navLi}>
                <Link className={classes.link} to="/cart">CART</Link>
            </li>
            {this.props.user && (this.props.user.roleId === 2) ?
            <li className={classes.navLi}>
                <Link className={classes.link} to="/my-orders">MY ORDERS
                </Link>
            </li>
            :null}
            <li className={classes.navLi}>
                <Link className={classes.link} to="/profile">PROFILE
                </Link>
            </li>
            {this.props.user && (this.props.user.roleId === 1) ?
            <li className={classes.navLi}>
                <Link className={classes.link} to="/admin">ADMIN
                </Link>
            </li>
            : null}
        </ul>
        <div className={classes.loggedUserShell}>{this.props.isUserLoggedIn ? <UserBtn/> : <Unregistered/>}</div>
    </div>)
    }
}

const mapStateToProps = state => ({
    isUserLoggedIn: state.userReducer.isLoggedIn,
    user: state.userReducer.user,
});

const mapDispatchToProps = dispatch => ({
    // 'checkUserLoginStatus': () => dispatch(isLoggedIn()),
    // grabCartItemsFromLS: () => dispatch(grabCartItemsFromLS()),
})

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Nav);