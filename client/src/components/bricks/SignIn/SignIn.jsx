import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, withMobileDialog} from '@material-ui/core';
import {Snackbar, SnackbarContent, IconButton} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withRouter} from 'react-router';
import {withStyles} from '@material-ui/core';
import styles from './styles.js';
import {tryToLogin, } from '../../../actions/userActions.js';
import {Formik, Form, Field} from 'formik';

let userInformed = false;

class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isDialogOpen: false,
            isDisabled: false,
            isSnackOpen: false,
        }
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.isLoggedIn) {
            // console.log(this.props.history);
            if (this.props.location.pathname === '/cart' && this.props.user.id) {
                this.props.history.push('/order-address');
            }
            // this.props.history.push('/');
        }
        if (this.props.tryToLoginCounter !== prevProps.tryToLoginCounter) {
            userInformed = !userInformed;
            this.setState({isSnackOpen: true,});
        }
        if (this.props.wrongPassword && !userInformed && (this.props.tryToLoginCounter !== prevProps.tryToLoginCounter)) {
            this.setState({isSnackOpen: this.props.wrongPassword});
        }
    }

    closeLoginDialog = () => {
        this.setState({isDialogOpen: false});
    }

    openDLoginDialog = () => {
        this.setState({isDialogOpen: true});
    }

    closeSnack = () => {
        this.setState({isSnackOpen: false});
        userInformed = true;

    }

    validate = values => {
        let errors = {};
        if (values.password.length < 3 || values.email.length < 3) {
            errors.invalidFields = 'Email or password is too short.';
            this.setState({isDisabled: true});
        } else {
            this.setState({isDisabled: false});
        }

        return errors;
    }

    submit = (values, actions) => {
        this.props.tryToLogin({email: values.email, password: values.password});
    }

    render = () => {
        const {classes} = this.props;

        return (<div className={classes.loginModalWrapper}>
            <Button onClick={this.openDLoginDialog} className={classes.signInBtn}>Sign In</Button>
            <Dialog
                open={this.state.isDialogOpen}
                onClose={this.closeLoginDialog}
            >
                <Formik
                validate={this.validate}
                initialValues={{email: '', password: ''}}
                onSubmit={this.submit}
                render={({errors, status, touched, isSubmitting}) => 
                    <>
                    <div>
                        <Form>
                            <h2>Type in your email and password to sign in.</h2>
                            <Field type="email" required name="email" placeholder="email" className={classes.field}/>
                            <Field required type="password" name="password" placeholder="password" className={classes.field}/>
                            {errors && errors.invalidFields && (touched.email || touched.password) && <div className={classes.error}>{errors.invalidFields}</div>}
                            {this.props.userSearchingResult && !this.props.userSearchingResult.hasUserFounded && <div className={classes.error}>
                                {this.props.userSearchingResult.message}
                            </div>}
                            <Button onClick={this.closeLoginDialog}>Close</Button>
                            <Button disabled={this.state.isDisabled} className={classes.signInFormBtn} variant="contained" type="submit">Sign In</Button>
                        </Form>
                    </div>
                    <Snackbar
                    open={this.state.isSnackOpen}
                    onClose={this.state.closeSnack}
                    autoHideDuration={6000}
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    >
                        <SnackbarContent
                            classes={{root: classes.error}}
                            message={<div>
                                <span>
                                    {
                                        // userCreatedSuccessfully ? registrationStatusMessages.success : registrationStatusMessages.fail
                                        'Wrong Password!'
                                    }
                                </span>
                                <IconButton style={{display: 'inline-block'}} color="inherit" style={{color: "white"}} onClick={this.closeSnack}>
                                    <Close/>
                                </IconButton>
                            </div>}
                        />
                    </Snackbar>
                    </>
                }
                />
            </Dialog>
        </div>);
    }
}

const mapStateToProps = state => ({
    user: state.userReducer.user.user,
    isLoggedIn: state.userReducer.isLoggedIn,
    wrongPassword: state.userReducer.wrongPassword,
    tryToLoginCounter: state.userReducer.tryToLoginCounter,
    userSearchingResult: state.userReducer.userSearchingResult,
});

const mapDispatchToProps = dispatch => ({
    tryToLogin: usersCredentials => dispatch(tryToLogin(usersCredentials)),
});


export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(withRouter(SignIn));
