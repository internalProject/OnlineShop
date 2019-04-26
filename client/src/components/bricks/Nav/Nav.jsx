import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';
import UserBtn from '../UserBtn';
import Unregistered from '../Unregistered';
import {isLoggedIn} from '../../../actions/userActions.js';
import styles from './styles.js';

class Nav extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount = () => {
        // this.props.getUserData();
        this.props.checkUserLoginStatus();
    }

    componentDidUpdate = () => {
        
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
        {this.props.isUserLoggedIn ? <UserBtn/> : <Unregistered/>}
    </nav>
    }
}

const mapStateToProps = state => ({
    isUserLoggedIn: state.userReducer.isLoggedIn,
    user: state.userReducer.user,
});

const mapDispatchToProps = dispatch => ({
    'checkUserLoginStatus': () => dispatch(isLoggedIn()),
})

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Nav);