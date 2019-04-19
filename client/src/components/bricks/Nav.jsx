import React from 'react';
import {withStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';
import UserBtn from './UserBtn.jsx';

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
        <UserBtn/>
    </nav>
    }
}

export default withStyles(styles)(Nav);