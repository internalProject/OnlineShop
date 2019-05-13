import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, withMobileDialog} from '@material-ui/core';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withStyles} from '@material-ui/core';
import styles from './styles.js';
import {tryToLogin} from '../../../actions/userActions.js';
import {Formik, Form, Field} from 'formik';

class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isDialogOpen: false,
            isDisabled: false,
        }
    }

    componentDidUpdate = () => {
        if (this.props.isLoggedIn) {
            this.props.history.push('/');
        }
    }

    closeLoginDialog = () => {
        this.setState({isDialogOpen: false});
    }

    openDLoginDialog = () => {
        this.setState({isDialogOpen: true});
    }

    render = () => {
        const {classes} = this.props;

        return <div className={classes.loginModalWrapper}>
            <Button onClick={this.openDLoginDialog} className={classes.signInBtn}>Sign In</Button>
            <Dialog
                open={this.state.isDialogOpen}
                onClose={this.closeLoginDialog}
            >
                <Formik
                validate={values => {
                    let errors = {};
                    if (values.password.length < 3 || values.email.length < 3) {
                        errors.invalidFields = 'Email or password is too short.';
                        this.setState({isDisabled: true});
                    } else {
                        this.setState({isDisabled: false});
                    }

                    return errors;
                }}
                initialValues={{email: '', password: ''}}
                onSubmit={(values, actions)=>{
                    this.props.tryToLogin({email: values.email, password: values.password});
                }}
                render={({errors, status, touched, isSubmitting}) => 
                    <div>
                        <Form>
                            <h2>Type in your email and password to sign in.</h2>
                            <Field type="email" required name="email" placeholder="email" className={classes.field}/>
                            <Field required type="password" name="password" placeholder="password" className={classes.field}/>
                            {errors && errors.invalidFields && (touched.email || touched.password) && <div className={classes.error}>{errors.invalidFields}</div>}
                            <Button onClick={this.closeLoginDialog}>Close</Button>
                            <Button disabled={this.state.isDisabled} className={classes.signInFormBtn} variant="contained" type="submit">Sign In</Button>
                        </Form>
                    </div>
                }
                />
            </Dialog>
        </div>;
    }
}

const mapStateToProps = state => ({
    user: state.userReducer.user.user,
    isLoggedIn: state.userReducer.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
    'tryToLogin': usersCredentials => dispatch(tryToLogin(usersCredentials)),
});


export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(SignIn);
