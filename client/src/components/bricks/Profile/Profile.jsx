import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core';
import {withRouter} from 'react-router';
import {Formik, Form, Field} from 'formik';
import cn from 'classnames';
import styles from './styles.js';


class Profile extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            address: '',
        }
    }
    
    submit = (values, actions) => {

    }
    
    validate = values => {
        let errors = {};


        return errors;
    }
    
    render = () => {
        const {classes} = this.props;        

        return <div className={classes.page}>
            <div className={classes.profileWrapper}>
            <Formik
                validate={this.validate}
                initialValues={{name: '', email: '', address: ''}}
                onSubmit={this.submit}
                render={({errors, status, touched, isSubmitting}) => 
                    <div>
                        <Form>
                            {/* <h2>Type in your email and password to sign in.</h2>
                            <Field type="email" required name="email" placeholder="email" className={classes.field}/>
                            <Field required type="password" name="password" placeholder="password" className={classes.field}/>
                            {errors && errors.invalidFields && (touched.email || touched.password) && <div className={classes.error}>{errors.invalidFields}</div>}
                            {this.props.userSearchingResult && !this.props.userSearchingResult.hasUserFounded && <div className={classes.error}>
                                {this.props.userSearchingResult.message}
                            </div>}
                            <Button onClick={this.closeLoginDialog}>Close</Button>
                            <Button disabled={this.state.isDisabled} className={classes.signInFormBtn} variant="contained" type="submit">Sign In</Button> */}
                        </Form>
                    </div>
                }
            />
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({
    user: state.userReducer.user.user,
});
const mapDispatchToProps = dispatch => ({});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(withRouter(Profile));

