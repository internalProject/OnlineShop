import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withStyles, Button} from '@material-ui/core';
import styles from './styles.js';
import {createUser} from '../../../actions/userActions.js';
import {Formik, Form, Field, ErrorMessage} from 'formik';

class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            pending: false,
        }
    }

    componentDidUpdate = () => {
        if (this.props.serverData) console.log('resp from server',this.props.serverData);
    }

    setName = e => {
        this.setState({name: e.target.value});
    }

    setEmail = e => {
        this.setState({email: e.target.value});
    }

    setPassword = e => {
        this.setState({password: e.target.value});
    }

    saveUser = e => {
        e.preventDefault();
        let userData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        };
        this.props.createUser(userData);
    }

    render = () => {
        const {classes} = this.props;

        return <div className={classes.signUpPage}>
            {/* <form onSubmit={this.saveUser} className={classes.registerForm}>
                <fieldset>
                    <legend className={classes.regFormLegend}>Fill the fileds to register</legend>
                    <label className={classes.label}>Name
                        <input onChange={this.setName} required className={classes.field} type="text"/>
                    </label>
                    <label className={classes.label}>Em@il
                        <input onChange={this.setEmail} required className={classes.field} type="email"/>
                    </label>
                    <label className={classes.label}>Password
                        <input onChange={this.setPassword} required className={classes.field} type="password"/>
                    </label>

                    <Button type="submit" variant="contained" className={classes.saveFormBtn}>Save user</Button>
                </fieldset>
            </form> */}
            <Formik 
            initialValues={{name: '', email: '', password: ''}}
            onSubmit={(values, actions) => {
                this.props.createUser(values)
                .then(good => {
                    actions.setSubmitting(false);
                    console.log('gooood');
                    console.log(good.data);
                }).catch(bad => {
                    actions.setSubmitting(false);
                    actions.setErrors(bad);
                    actions.setStatus({ msg: 'Set some arbitrary status or data' });
                })
            }}
            render={({ errors, status, touched, isSubmitting }) => (
                <Form>
                    <Field className={classes.field} name="name" />
                    <Field className={classes.field} name="email" type="email" />
                    <ErrorMessage name="email" component="div" />
                    <Field className={classes.field} name="password" type="password" />
                    <Button type="submit" disabled={isSubmitting} variant="contained" className={classes.saveFormBtn}>Save user</Button>
                </Form>
            )}
            />
        </div>;
    }
}

const mapStateToProps = state => ({
    serverData: state.userReducer.serverData,
});

const mapDispatchToProps = dispatch => ({
    'createUser': user => dispatch(createUser(user)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(SignUp);