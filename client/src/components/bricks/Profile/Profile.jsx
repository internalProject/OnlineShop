import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles, Button, IconButton, } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import {withRouter} from 'react-router';
import {Formik, Form, Field} from 'formik';
import {getUserData} from '../../../actions/userActions.js';
import cn from 'classnames';
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
        }
    }

    componentDidMount = () => {
        console.log(this.props);
        if (!this.props.user.id) {
            this.props.getUserData(this.props.user.name);
        }
    }

    // TODO: FIX THIS!

    // componentDidUpdate = prevProps => {
    //     if (prevProps.user !== this.props.user) {
    //         this.setState({dataForUpdate: {
    //             name: this.props.user.name,
    //             email: this.props.user.email,
    //             address: this.props.user.address,
    //         }})
    //     }
    // }

    // shouldComponentUpdate = ( nextProps, nextSate) => {
    //     if (this.state.dataForUpdate.name === nextSate.dataForUpdate.name &&
    //         this.state.dataForUpdate.email === nextSate.dataForUpdate.email &&
    //         this.state.dataForUpdate.address === nextSate.dataForUpdate.address
    //         ) { 
    //         return false; 
    //     }
    // }
    
    submit = (values, actions) => {
        console.log(this.state.dataForUpdate);
    }
    
    validate = values => {
        let errors = {};
        if (values.name.length < 3) {
            this.setState({disabledSubmit: true,});
            errors.name = 'Name is too short!';
        }
        if (values.address.length < 15) {
            this.setState({disabledSubmit: true,});
            errors.address = 'Address is too short!'
        }

        return errors;
    }

    editName = e => {
        this.setState({disabledFields: {
            ...this.state.disabledFields,
            name: !this.state.disabledFields.name,
        }});
    }

    onNameChange = e => {
        this.setState({dataForUpdate: {name: e.target.value,}});
    }

    editEmail = e => {
        this.setState({
            disabledFields: {
            ...this.state.disabledFields,
            email: !this.state.disabledFields.email,
            }
        });
    }

    onEmailChange = e => {
        this.setState({dataForUpdate: {email: e.target.value,}});
    }

    editAddress = e => {
        this.setState({
            disabledFields: {
                ...this.state.disabledFields,
                address: !this.state.disabledFields.address,
            }
        });
    }

    onAddressChange = e => {
        this.setState({dataForUpdate: {address: e.target.value,}});
    }
    
    render = () => {
        const {classes} = this.props;        

        return <div className={classes.page}>
            <div className={classes.profileWrapper}>
            <Formik
                validate={this.validate}
                enableReinitialize={true}
                initialValues={{
                    name: this.state.dataForUpdate && this.state.dataForUpdate.name ? this.state.dataForUpdate.name : '',
                    email: this.state.dataForUpdate && this.state.dataForUpdate.email ? this.state.dataForUpdate.email : '',
                    address: this.state.dataForUpdate && this.state.dataForUpdate.address ? this.state.dataForUpdate.address : '',
                }}
                onSubmit={this.submit}
                render={({errors, status, touched, isSubmitting, values}) => 
                    <div>
                        <Form className={classes.formShell}>
                            <div className={classes.fieldWrapper}>
                                <div className={classes.fieldNlabel}>
                                    <label className={cn(classes.toBlock)} htmlFor="profile-user-name">Name:   </label>
                                    <Field id="profile-user-name" name="name"
                                        disabled={this.state.disabledFields.name}
                                        className={cn(classes.toBlock,classes.field)}
                                        value={values.name}
                                        onChange={this.onNameChange}
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
                                        onChange={this.onEmailChange}
                                    />
                                </div>
                                <IconButton className={cn(classes.toBlock, classes.toWhite)} onClick={this.editEmail}><Edit /></IconButton>
                            </div>
                            <div className={classes.fieldWrapper}>
                                <div className={classes.fieldNlabel}>
                                    <label className={cn(classes.toBlock)} htmlFor="profile-user-address">Address:   </label>
                                    <Field className={cn(classes.toBlock)} id="profile-user-address" name="address"
                                        value={values.address}
                                        className={cn(classes.toBlock,classes.field)}
                                        disabled={this.state.disabledFields.address}
                                        onChange={this.onAddressChange}
                                    />
                                </div>
                                <IconButton className={cn(classes.toBlock, classes.toWhite)} onClick={this.editAddress}><Edit /></IconButton>
                            </div>
                            {errors && errors.address && 
                            <div className={classes.error}>{errors.address}</div>}

                            <div>
                                <Button disabled={this.state.disabledSubmit} variant="contained" type="submit">Save Changes</Button> 
                            </div>
                        </Form>
                    </div>
                }
            />
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({
    user: state.userReducer.user,
});
const mapDispatchToProps = dispatch => ({
    getUserData: name => dispatch(getUserData(name)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(withRouter(Profile));

