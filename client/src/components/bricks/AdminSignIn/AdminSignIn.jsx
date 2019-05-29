import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles, Button} from '@material-ui/core';
import {Snackbar, SnackbarContent, IconButton} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import styles from './styles.js';
import {Formik, Form, Field} from 'formik';
// import {getAdminDataFromServer} from '../../../actions/adminActions.js';


class AdminSignIn extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isSnackOpen: false,
        }
    }

    componentDidUpdate = prevProps => {
        if (prevProps.serverData === null && (this.props.serverData && this.props.serverData.message)) {
            this.setState({isSnackOpen: true});
        }

        if (this.props.serverData &&
            this.props.serverData.status && (
            prevProps.serverData !== null && (this.props.serverData.message !== prevProps.serverData.message)
        )) {
            this.setState({isSnackOpen: true,});
        }
    }

    closeSnack = () => {
        this.setState({isSnackOpen: false});
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
        // this.props.getAdminData({email: values.email, password: values.password});
    }

    render = () => {
        const {classes} = this.props;

        return <div>
            <div>
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
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({
    admin: state.adminReducer.admin,
    serverData: state.adminReducer.serverData,
});
const mapDispatchToProps = dispatch => ({
    // getAdminData: creds => dispatch(getAdminDataFromServer(creds)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(AdminSignIn);

