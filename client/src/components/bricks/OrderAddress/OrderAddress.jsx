import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {withStyles} from '@material-ui/core';
import Header from '../../bricks/Header';
import {Formik, Form, Field} from 'formik';
import {Button, Snackbar, SnackbarContent, IconButton} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import styles from './styles.js';
import {clearCart, makeOrder} from '../../../actions/cartActions.js';
import {getUserData} from '../../../actions/userActions.js';
import cn from 'classnames';


class OrderAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisabled: false,
            isSnackOpen: false,
            userInformed: false,
        }
    }
    
    validate = values => {
        let errors = {};
        if (values.address.length < 15) {
            errors.invalidAddress = "Address is too short";
            this.setState({isDisabled: true});
        } else {
            this.setState({isDisabled: false});
        }
        return errors;
    }

    componentDidMount = () => {
        console.log(this.props);
        if (this.props.serverData.id) {
            this.props.getUserData(this.props.serverData.user.name);
        }

    }

    componentDidUpdate = prevProps => {
        if (!this.props.isLoggedIn) {
            this.props.history.push('/');
        }
        if ((this.props.orderNumber !== prevProps.orderNumber) && this.props.orderStatus.status !== '') { // if (this.props.orderNumber !== prevProps.orderNumber) {
            this.setState({isSnackOpen: true,});
        }
        if (this.props.orderStatus && this.props.orderStatus.status === 'success' && this.state.userInformed) {
            this.props.clearCart();
        }
    }
 
    submit = (values, actions) => {
        let orderTime = new Date().toISOString().replace('T', ' ');
        orderTime = orderTime.slice(0, orderTime.indexOf('.'));

        this.sendRequestForOrder({
            user: {
                id: this.props.serverData.user.id,
                address: this.props.serverData.user.address,
                // address: values.address,
            },
            order: {
                items: this.props.cartItems,
                date: orderTime,
            },
        });
    }

    sendRequestForOrder = orderData => {
        this.props.makeOrder(orderData);
        // console.log('on order');
    }

    closeSnack = () => {
        this.setState({isSnackOpen: false, userInformed: !this.state.userInformed});
    }

    render = () => {
        const {classes} = this.props;

        return (<div className={classes.pageWrapper}>
            <Header />
            <div className={classes.pageContent}>
                <div className={classes.innerShell}>
                    <Formik
                    validate={this.validate}
                    initialValues={{address: this.props.user && this.props.user.address ? 
                        this.props.user.address: 
                        this.props.serverData.address
                    }}
                    onSubmit={this.submit}
                    render={({errors, status, touched, handleChange, values}) => 
                    <Form className={classes.form}>
                            <Field name="address"
                            placeholder="address"
                            component="textarea"
                            value={values.address}
                            className={cn(classes.formElement,classes.addressField)} />
                            {errors && errors.invalidAddress && touched.address &&
                            <div className={classes.error}>
                                {errors.invalidAddress}
                            </div>}

                            <Button
                            disabled={this.state.isDisabled}
                            size="medium"
                            className={cn(classes.formElement, classes.sendBtn)}
                            type="submit"
                            variant="contained"
                                >Send Request
                            </Button>
                        </Form>
                    }
                    />
                </div>
            </div>
            {
                this.props.orderStatus.message !== '' && !this.props.orderStatus.error ? 
                <Snackbar
                open={this.state.isSnackOpen}
                onClose={this.state.closeSnack}
                autoHideDuration={2000}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                >
                    <SnackbarContent
                        classes={{root: this.props.orderStatus.error ? classes.snackError: classes.snackSuccess}}
                        message={<div>
                            <span>
                                {
                                    this.props.orderStatus.status === 'success' ? this.props.orderStatus.message : 
                                    `${this.props.orderStatus.message}\n${this.props.orderStatus.error}`
                                }
                            </span>
                            <IconButton style={{display: 'inline-block'}} color="inherit" style={{color: "white"}} onClick={this.closeSnack}>
                                <Close/>
                            </IconButton>
                        </div>}
                    />
                </Snackbar>
                : 
                null // <div className={classes.error}>`${this.props.orderStatus.error}`</div>
            }
        </div>);
    }
}

const mapStateToProps = state => ({
    user: state.userReducer.user.user,
    serverData: state.userReducer.user,
    isLoggedIn: state.userReducer.isLoggedIn,
    cartItems: state.cartReducer.picked,
    orderStatus: state.cartReducer.orderStatus,
    orderNumber: state.cartReducer.orderNumber,
});

const mapDispatchToProps = dispatch => ({
    makeOrder: order => dispatch(makeOrder(order)),
    clearCart: () => dispatch(clearCart()),
    getUserData: name => dispatch(getUserData(name)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(withRouter(OrderAddress));

