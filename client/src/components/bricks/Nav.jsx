import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';
import UserBtn from './UserBtn.jsx';
import Unregistered from './Unregistered.jsx';
import {getUserData, isLoggedIn} from '../../actions/userActions.js';


const styles = {
    navBar: {
        minHeight: '50px',
        backgroundColor: '#333',
        color: 'white',
        width: '100%',
        marginBottom: '-12px',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',

    },
    navLinks: {
        listStyleType: 'none',
        display: 'block',
        // height: '100%',
    },
    navLi: {
        display: 'inline-block',
        minWidth: '150px',
        cursor: 'pointer',
        '&:hover': {
            background: 'radial-gradient(#827717, #111)'
        },
        height: '100%',
    },
    link: {
        color: 'white',
        fontFamily: 'Roboto',
        fontSize: '24px',
        width: '100%',
        height: '100%',
        textDecoration: 'none',
        display: 'inline-block',
        textAlign: 'center',
        paddingTop: '12px',
    }
}

class Nav extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount = () => {
        this.props.getUserData();
    }

    componentDidUpdate = () => {
        if (this.props.user.name) {
            this.props.checkLogin(this.props.user);
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
    'checkLogin': (user) => dispatch(isLoggedIn(user)), 
})

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Nav);