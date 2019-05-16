import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core';
import Header from '../../bricks/Header';
import {Formik, Form, Field} from 'formik';
import {Button,} from '@material-ui/core';
import styles from './styles.js';
import {sendRequest,} from '../../../actions/cartActions.js';
import cn from 'classnames';

class OrderAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisabled: false,
        }
    }
    
    test = data => {
        console.log(data);
    }

    render = () => {
        const {classes} = this.props;

        return <div className={classes.pageWrapper}>
            <Header />
            <div className={classes.pageContent}>
                <div className={classes.innerShell}>
                    <Formik
                    // validate={values => {
                    //     let errors = {};
                    //     if (values.address.length < 15) {
                    //         errors.invalidAddress = "Address is too short";
                    //         this.setState({isDisabled: true});
                    //     } else {
                    //         errors.invalidAddress = null;
                    //         this.setState({isDisabled: false});
                    //     }
                    //     return errors;
                    // }}
                    initialValues={{address: ''}}
                    onSubmit={(values, actions)=>{
                        this.test({
                            user: {
                                id: this.props.user.id,
                                address: values.address,
                            },
                            order: this.props.cartItems,
                        });
                    }}
                    render={({errors, status, touched, isSubmitting}) => 
                    <Form className={classes.form}>
                            <Field name="address" placeholder="address" component="textarea" className={cn(classes.formElement,classes.addressField)} />
                            {errors && errors.invalidAddress && touched.address && <div className={classes.error}>
                                {errors.invalidAddress}
                            </div>}
                            <Button disabled={this.state.isDisabled} size="medium" className={cn(classes.formElement, classes.sendBtn)} type="submit" variant="contained">Send Request</Button>
                        </Form>
                    }
                    />
                </div>
                
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({
    user: state.userReducer.user,
    cartItems: state.cartReducer.picked,
});

const mapDispatchToProps = dispatch => ({
    sendRequest: data => dispatch(sendRequest(data)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(OrderAddress);

