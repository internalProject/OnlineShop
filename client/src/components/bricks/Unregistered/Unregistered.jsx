import React from 'react';
import {withStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';
import styles from './styles.js';
import SignIn from '../SignIn';

class Unregistered extends React.Component {
    render = () => {
        const {classes} = this.props;

        return (<div className={classes.togglesSignInMenu}>
            <div className={classes.regLinkWrapper}>
                {/* <Link className={classes.registerLinks} to="/sign-in"><span className={classes.linkTextHook}>Sign In</span></Link> */}
                <SignIn />
            </div>
            <div className={classes.regLinkWrapper} style={{height: "36px"}}>
                <Link className={classes.registerLinks} to="/sign-up"><span className={classes.linkTextHook}>Sign Up</span></Link>
            </div>
        </div>);
    }
}

export default withStyles(styles)(Unregistered);

