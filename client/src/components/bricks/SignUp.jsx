import React from 'react';
import {withStyles} from '@material-ui/core';

const styles = {
    signUpPage: {
        height: '100%',
        width: '100%',
        color: 'white',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("./assets/recruit.jpg")',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        display: 'flex',
        justifyContent: 'center',
    },
    registerForm: {
        width: '100%',
        maxWidth: '600px',
        height: '500px',
        marginTop: '200px',
        ['@media (max-width: 640px)']: {
            marginTop: '100px',
        }
    },
    regFormLegend: {
        fontFamily: 'Abril Fatface',
        fontSize: '2.5em',
        ['@media (max-width: 640px)']: {
            fontSize: '1.8em',
        },
    }
}


class SignUp extends React.Component {
    constructor(props){
        super(props);
    }

    render = () => {
        const {classes} = this.props;

        return <div className={classes.signUpPage}>
            <form className={classes.registerForm}>
                <fieldset>
                    <legend className={classes.regFormLegend}>Fill the fileds to register</legend>
                    fields
                </fieldset>
            </form>
        </div>;
    }
}

export default withStyles(styles)(SignUp);