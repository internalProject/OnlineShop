import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';
import UserBtn from '../UserBtn';
import Unregistered from '../Unregistered';
import {getUserData, isLoggedIn} from '../../../actions/userActions.js';
import styles from './styles.js';

class Nav extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount = () => {
        this.props.getUserData();
    }

    componentDidUpdate = () => {
        if (this.props.user.name) {
            this.props.checkLogin();
        }
    }

    render = () => {
        const {classes} = this.props;

        return <nav className={classes.navBar}>
        <ul className={classes.navLinks}>
            <li className={classes.navLi}>
                <Link className={classes.link} to="/cart">CART</Link>
            </li>
            <li className={classes.navLi}>
                <Link className={classes.link} to="/">1
                </Link>
            </li>
            <li className={classes.navLi}>
                <Link className={classes.link} to="/">2
                </Link>
            </li>
            <li className={classes.navLi}>
                <Link className={classes.link} to="/">3
                </Link>
            </li>
        </ul>
        {this.props.isLoggedIn ? <UserBtn/> : <Unregistered/>}
    </nav>
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.userReducer.isLoggedIn,
    user: state.userReducer.user,
});

const mapDispatchToProps = dispatch => ({
    'getUserData': () => dispatch(getUserData()),
    'checkLogin': () => dispatch(isLoggedIn()), 
})

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Nav);