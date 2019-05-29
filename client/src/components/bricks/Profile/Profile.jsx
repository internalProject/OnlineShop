import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles, Button, IconButton, Snackbar, SnackbarContent,} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Edit from '@material-ui/icons/Edit';
import {withRouter, Redirect} from 'react-router';
import Header from '../Header';
import {Formik, Form, Field} from 'formik';
import {getUserData, updateUser} from '../../../actions/userActions.js';
import cn from 'classnames';
import _ from 'lodash';
import styles from './styles.js';


class Profile extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            disabledFields: {
                name: true,
                email: true,
                address: true,
            },
            initialUserData: {},
            dataForUpdate: {},
            disabledSubmit: false,
            touched: false,
            isSnackOpen: false,
        }
    }

    componentDidMount = () => {
        console.log(this.props);
        if (!this.props.user.id) {
            this.props.getUserData(this.props.user.name);
        }
        if (!this.state.touched && this.state.initialUserData.name === undefined && this.props.user) {
            this.setState({initialUserData: {
                name: this.props.user.name,
                email: this.props.user.email,
                address: this.props.user.address,
            }});
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
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
    
    submit = (values, actions) => {
        this.props.updateUser({
            id: this.props.user.id,
            name: values.name,
            email: values.email,
            address: values.address,
        });
        this.setState({isSnackOpen: false});
    }
    
    validate = values => {
        let errors = {};
        if (values.name.length < 3) {
            this.setState({disabledSubmit: true,});
            errors.name = 'Name is too short!';
        } else this.setState({disabledSubmit: false,});
        if (values.address.length < 15) {
            this.setState({disabledSubmit: true,});
            errors.address = 'Address is too short!'
        } else this.setState({disabledSubmit: false,});
        if (!/[a-z_0-9]{2,}@[a-z]{2,}.[a-z{2,}]/.test(values.email)) {
            errors.email = 'Value not look\'s like email!';
            this.setState({disabledSubmit: true,});
        } else this.setState({disabledSubmit: false,});

        return errors;
    }

    editName = e => {
        this.setState({disabledFields: {
            ...this.state.disabledFields,
            name: !this.state.disabledFields.name,
        }});
    }

    editEmail = e => {
        this.setState({
            disabledFields: {
            ...this.state.disabledFields,
            email: !this.state.disabledFields.email,
            }
        });
    }

    editAddress = e => {
        this.setState({
            disabledFields: {
                ...this.state.disabledFields,
                address: !this.state.disabledFields.address,
            }
        });
    }

    closeSnack = () => {
        this.setState({isSnackOpen: false})
    }
    
    render = () => {
        const {classes} = this.props;        

        return this.props.isLoggedIn ? <> 
        <Header />
        <div className={classes.page}>
            <div className={classes.profileWrapper}>

            <Formik
                validate={this.validate}
                enableReinitialize={true}
                initialValues={{
                    name: this.props.user && this.props.user.name ? this.props.user.name : '',
                    email: this.props.user && this.props.user.email ? this.props.user.email : '',
                    address: this.props.user && this.props.user.address ? this.props.user.address : '',
                }}
                onSubmit={this.submit}
                render={({errors, status, touched, isSubmitting, values}) => 
                    
                    <div>
                        <Form className={classes.formShell}>
                        <fieldset className={classes.fieldSet}>
                        <legend className={classes.formLegend}>Edit data form.</legend>
                            <div className={classes.fieldWrapper}>
                                <div className={classes.fieldNlabel}>
                                    <label className={cn(classes.toBlock)} htmlFor="profile-user-name">Name:   </label>
                                    <Field id="profile-user-name" name="name"
                                        disabled={this.state.disabledFields.name}
                                        className={cn(classes.toBlock,classes.field)}
                                        value={values.name}
                                    />
                                </div>
                                <IconButton className={cn(classes.toBlock, classes.toWhite)} onClick={this.editName}><Edit /></IconButton>
                            </div>
                            {errors && errors.name && 
                            <div className={classes.error}>{errors.name}</div>}

                            <div className={classes.fieldWrapper}>
                                <div className={classes.fieldNlabel}>
                                    <label className={cn(classes.toBlock)} htmlFor="profile-user-email">Email:   </label>
                                    <Field className={cn(classes.toBlock)} id="profile-user-email" name="email"
                                        type="email"
                                        value={values.email}
                                        className={cn(classes.toBlock,classes.field)}
                                        disabled={this.state.disabledFields.email}
                                    />
                                </div>
                                <IconButton className={cn(classes.toBlock, classes.toWhite)} onClick={this.editEmail}><Edit /></IconButton>
                            </div>
                            {errors && errors.email && 
                            <div className={classes.error}>{errors.email}</div>}

                            <div className={classes.fieldWrapper}>
                                <div className={classes.fieldNlabel}>
                                    <label className={cn(classes.toBlock)} htmlFor="profile-user-address">Address:   </label>
                                    <Field className={cn(classes.toBlock)} id="profile-user-address" name="address"
                                        value={values.address}
                                        className={cn(classes.toBlock,classes.field)}
                                        disabled={this.state.disabledFields.address}
                                    />
                                </div>
                                <IconButton className={cn(classes.toBlock, classes.toWhite)} onClick={this.editAddress}><Edit /></IconButton>
                            </div>
                            {errors && errors.address && 
                            <div className={classes.error}>{errors.address}</div>}

                            <div className={classes.submitBtnContainer}>
                                <Button color="primary" disabled={this.state.disabledSubmit} variant="contained" type="submit">Save Changes</Button> 
                            </div>
                        </fieldset>
                        </Form>
                        {this.props.serverData ? 
                        <Snackbar
                            className={classes.snackStyles}
                            open={this.state.isSnackOpen}
                            onClose={this.state.closeSnack}
                            autoHideDuration={6000}
                            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                        >
                            <SnackbarContent
                                classes={{root: (this.props.serverData.status === 'success' ? classes.snackSuccess : classes.snackError)}}
                                message={<div className={classes.snackMsg}>
                                    <span style={{display: 'inline-block'}} id="message-id">
                                        {this.props.serverData && this.props.serverData.message ? this.props.serverData.message : ''}
                                    </span>
                                    <IconButton style={{display: 'inline-block'}} color="inherit" style={{color: "white"}} onClick={this.closeSnack}>
                                        <CloseIcon/>
                                    </IconButton>
                                </div>}
                            />
                        </Snackbar>: 
                        null }
                    </div>
                }
            />
            </div>
        </div>
        </> 
        : <Redirect to="/" />
    }
}

const mapStateToProps = state => ({
    user: state.userReducer.user,
    isLoggedIn: state.userReducer.isLoggedIn,
    serverData: state.userReducer.serverData,
});
const mapDispatchToProps = dispatch => ({
    getUserData: name => dispatch(getUserData(name)),
    updateUser: userData => dispatch(updateUser(userData)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(withRouter(Profile));

