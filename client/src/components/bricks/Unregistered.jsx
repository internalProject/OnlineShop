import React from 'react';
import {withStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';

const styles = {
    togglesSignInMenu : {
        width: '196px',
        backgroundColor: '#333',
        border: '2px solid white',
        left: '-2px',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    regLinkWrapper: {
        height: '100%',
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerLinks: {
        color: 'white',
        textDecoration: 'none',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            background: 'radial-gradient(#827717, #111)'
        },
    },
    linkTextHook: {
        display: 'block',
    }
};

class Unregistered extends React.Component {
    render = () => {
        const {classes} = this.props;

        return <div className={classes.togglesSignInMenu}>
            <div className={classes.regLinkWrapper}>
                <Link className={classes.registerLinks} to="/sign-in"><span className={classes.linkTextHook}>Sign In</span></Link>
            </div>
            <div className={classes.regLinkWrapper}>
                <Link className={classes.registerLinks} to="/sign-up"><span className={classes.linkTextHook}>Sign Up</span></Link>
            </div>
        </div>;
    }
}

export default withStyles(styles)(Unregistered);

