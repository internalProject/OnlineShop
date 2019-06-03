import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles, IconButton, Button, Snackbar, SnackbarContent,} from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText} from '@material-ui/core';
import {Formik, Form, Field} from 'formik';
import Close from '@material-ui/icons/Close';
import styles from './styles.js';
import cn from 'classnames';

class AddNewProduct extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            disabled: false,
        }
    }

    validate = values => {
        let errors = {};
        if (values.name.length < 3) {
            this.setState({disabledForm: true,})
            errors.name = "Product name have to contains more than or equal 3 characters!"
        } else {
            this.setState({disabledForm: false,})
        }
        if (values.description.length < 6) {
            this.setState({disabledForm: true,});
            errors.description = "Product description have to contains more than or equal 6 characters!"
        } else {
            this.setState({disabledForm: false,})
        }
        return errors;
    }

    submit = (values, actions) => {
        // closeEditModal
        this.props.saveChanges({id: values.id, name: values.name, description: values.description,})
        this.props.newProductFormHandler();
    }
    
    render = () => {
        const {classes} = this.props;

        return <Dialog
            open={this.props.newProductFormState}
            onClose={this.props.newProductFormHandler}
            aria-labelledby="edit-item-dialog-title"
            aria-describedby="edit-item-dialog-description"
            classes={{paper: cn(classes.dialog), }}
        >
            <Formik 
                validate={this.validate}
                enableReinitialize={true}
                initialValues={{
                    name: '',
                    description: '',
                }}
                onSubmit={this.submit}
                render={({errors, status, touched, values}) => <div>
                    <Form>
                    <DialogTitle className={classes.editDialogTitle} id="edit-item-dialog-title">Edit <span className={classes.emphasizedName}>{`${this.props.item.name}`}</span></DialogTitle>
                    <DialogContent className={classes.editDialogContent}>
                        <Field type="text" name="name" className={classes.editName}  value={values.name} />
                        {errors && errors.name && <div className={classes.error}>{errors.name}</div>}
                        <Field render={ ( {field, form:{values, errors}} ) => (<>
                            <textarea {...field} name="description" className={classes.descrArea} value={values.description}></textarea>
                            {errors && errors.description && <div className={classes.error}>{errors.description}</div>}
                        </>) }  />
                    </DialogContent>
                    <DialogActions className={classes.modalControls}>
                        <Button className={classes.toBlock} onClick={this.props.newProductFormHandler} variant="contained" >Cancel</Button>
                        <Button type="submit" disabled={this.state.disabledForm} className={classes.toBlock} variant="contained" color="primary">Save</Button>
                    </DialogActions>
                    </Form>
                </div>}
            />
        </Dialog>;
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(AddNewProduct);

