import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {compose} from 'redux';
import {withStyles, Button, Snackbar, SnackbarContent, Slide, IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styles from './styles.js';
import {createUser, userHasRegistred} from '../../../actions/userActions.js';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import ls from 'local-storage';


const snackTransition =  props => <Slide {...props} direction="up" />
let userCreatedSuccessfully = false;
let registrationStatusMessages = {
    success: 'You have been sign up successfully!',
    fail: '',
};

class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pending: false,
            isDisabled: false,
            isSnackOpen: false,
            Transition: null,
        }
    }

    componentDidMount = () => {
        
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.serverData && this.props.serverData.data.status) {

            if (prevProps.registerCounter === this.props.registerCounter) return;
            
            if (this.props.serverData.data.status === 'success') {
                registrationStatusMessages.success = this.props.serverData.data.message;
                this.showSuccessSnack(snackTransition)();
                userCreatedSuccessfully = true;
            } else {
                registrationStatusMessages.fail = this.props.serverData.data.message;
                this.showSuccessSnack(snackTransition)();
                userCreatedSuccessfully = false;
            }
        }
    }

    showSuccessSnack = Transition => () => {
        this.setState({isSnackOpen: true, Transition});
    }

    closeSuccessSnack = () => {
        this.setState({isSnackOpen: false,});
    }

    onStorage = () => {
        this.props.isLoggedIn();
    }

    render = () => {
        const {classes} = this.props;
        return <div className={classes.signUpPage}>
            
            <Formik
                validate={values => {
                    let errors = {};
                    if (values.password !== values.confirmPassword) {
                        errors.passNotMatch = '"Passwrod and Confirm Passwrod aren\'t match"';
                        this.setState({isDisabled: true});
                    } else {
                        this.setState({isDisabled: false});
                    }
                    if (values.password.length <3) {
                        errors.passLength = 'Password is too short';
                        this.setState({isDisabled: true});
                    } else {
                        this.setState({isDisabled: false});
                    }
                    if (values.name.length <3) {
                        errors.nameLength = 'Name is too short';
                        this.setState({isDisabled: true});
                    } else {
                        this.setState({isDisabled: false});
                    }
                    return errors;
                }}
                initialValues={{name: '', email: '', password: '', confirmPassword: ''}}

                onSubmit={(values, actions) => {
                    if (values.password !== values.confirmPassword) {
                        actions.setStatus({msg: 'Password is not match to confirmPassword field!'});
                        actions.setSubmitting(false);

                        return;
                    }
                    this.props.createUser(values)
                    .then(good => {
                        actions.setSubmitting(false);
                        

                        console.dir(good);
                        ls.set('ws-name', values.name);
                        this.props.userHasRegistred();
                        for(let v in values) {
                            values[v] = '';
                        }
                    }).catch(bad => {
                        actions.setSubmitting(false);
                        actions.setErrors(bad);
                        actions.setStatus({ msg: bad.message });
                    })
                }}
                
                render={({ errors, status, touched, isSubmitting }) => (<>
                    <div className={classes.navBar}>
                        <div className={classes.linkWrapper}>
                            <Link className={classes.navLink} to="/">
                                <span className={classes.linkText}>Home</span>
                            </Link>
                        </div>
                    </div>
                    <Form className={classes.registerForm}>
                        <fieldset>
                            <legend className={classes.regFormLegend}>Fill the fileds to register</legend>
                            <label className={classes.label}>Name
                                <Field required className={classes.field} name="name" />
                                {errors && touched.name && errors.nameLength && <div className={classes.error}>{errors.nameLength}</div>}
                            </label>
                            <label className={classes.label}>Em@il
                                <Field required className={classes.field} name="email" type="email" />
                            </label>
                            <label className={classes.label}>Password
                                <Field required className={classes.field} name="password" type="password" />
                                {errors && touched.password && errors.passLength && <div className={classes.error}>{errors.passLength}</div>}
                            </label>
                            <label className={classes.label}>Confirm Password
                                <Field required className={classes.field} name="confirmPassword" type="password" />
                                {errors && touched.confirmPassword && errors.passNotMatch && <div className={classes.error}>{errors.passNotMatch}</div>}
                            </label>
                            <Button  type="submit" disabled={this.state.isDisabled} variant="contained" className={classes.saveFormBtn}>Save user</Button>
                        </fieldset>
                    </Form>
                </>)}
            />
            <Snackbar
                className={classes.snackStyles}
                open={this.state.isSnackOpen}
                onClose={this.state.closeSuccessSnack}
                autoHideDuration={6000}
                TransitionComponent={snackTransition}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <SnackbarContent className={
                    userCreatedSuccessfully ? classes.success : classes.registrationFailed 
                }
                    message={<div className={classes.snackMsg}>
                        <span style={{display: 'inline-block'}} id="message-id">
                            {
                                userCreatedSuccessfully ? registrationStatusMessages.success : registrationStatusMessages.fail
                            }
                        </span>
                        <IconButton style={{display: 'inline-block'}} color="inherit" style={{color: "white"}} onClick={this.closeSuccessSnack}>
                            <CloseIcon/>
                        </IconButton>
                    </div>}
                />
            </Snackbar>
        </div>;
    }
}

const mapStateToProps = state => ({
    serverData: state.userReducer.serverData,
    registerCounter: state.userReducer.registerCounter,
});

const mapDispatchToProps = dispatch => ({
    createUser: user => dispatch(createUser(user)),
    userHasRegistred: () => dispatch(userHasRegistred()),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(SignUp);