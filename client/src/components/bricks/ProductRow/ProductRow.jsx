import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles, IconButton, Button, Snackbar, SnackbarContent, } from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText} from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import { DeleteForever } from '@material-ui/icons';
import Close from '@material-ui/icons/Close';
import {Formik, Form, Field} from 'formik';
import styles from './styles.js';
import {removeItem,saveChanges, } from '../../../actions/adminActions.js';
import request from 'superagent';
import {Image} from 'cloudinary-react';
import cn from 'classnames';

const PRESET_NAME = 'zelospreset';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/zelos/upload'

class ProductRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            isRemoveModalOpen: false,
            isEditModalOpen: false,
            isSnackOpen: false,
            disabledForm: false,
            uploadedFile: null,
            uploadedImageMsg: 'Image upload successfully!',
            uploadedStatus: false,
        }
        this.cloudinaryRef = React.createRef();
    }

    // TODO: 
    // 2. add new item to store
    // 3. control users

    componentDidMount = (pProps, pState) => {
        if (this.props.item) {
            this.setState({
                name: this.props.item.name,
                description: this.props.item.description,
            })
        }
    }

    componentDidUpdate = prevProps => {
        if (this.props.serverData && prevProps.serverData === null) {
            this.setState({isSnackOpen: true});
        }
        if (this.props.serverData && prevProps.serverData && (this.props.productEdited !== prevProps.productEdited) ) {
            this.setState({isSnackOpen: true});
        }
    }

    saveItemChanges = e => {
        this.saveChanges({});
        this.setState({isEditModalOpen: false});
        // + operations status notification!!!!
    }

    tryToRemove = e => {
        this.setState({isRemoveModalOpen: true,});
    }

    openEditModal = e => {
        this.setState({isEditModalOpen: true});
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
        this.setState({isEditModalOpen: false,});
    }

    closeEditModal = e => {
        this.setState({isEditModalOpen: false});
        // + operations status notification!!!!
    }

    closeRemoveModal = e => {
        this.setState({isRemoveModalOpen: false,});
        // + operations status notification!!!!
    }

    removeItemFromStore = e => {
        this.props.removeItem(this.props.item.id);
        this.setState({isRemoveModalOpen: false,});
    }

    closeSnack = () => {
        this.setState({isSnackOpen: false, uploadedImageMsg: '', uploadedStatus: false,});
    }

    uploadImage = (e) => {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
        .field('upload_preset', PRESET_NAME)
        .field('file', this.cloudinaryRef.current.files[0])
        .field('folder', 'military')
        .field('public_id', this.cloudinaryRef.current.files[0].name.slice(0, this.cloudinaryRef.current.files[0].name.indexOf('.')));

        upload.end((err, response) => {
            if (err) {
                this.setState({isSnackOpen: true, uploadedStatus: true, uploadedImageMsg: 'Fail on image upload!'})
            }

            if (response.body.secure_url !== '') {
                this.setState({isSnackOpen: true, uploadedStatus: true,})
            }
        });
    }
     
    render = () => {
        const {classes} = this.props;

        return <div>{
            this.props.item ?
            (<div className={classes.item}>
                <div className={classes.id}>{this.props.item.id}</div>
                <div className={classes.name}>
                    <div className={classes.innerName}>{this.props.item.name}</div>
                    <Image crop="scale" className={classes.cloudImage} cloudName="zelos" publicId={`military/${this.props.item.name}`} />                    
                </div>
                <div className={classes.description}>{this.props.item.description}</div>
                <div className={classes.itemControlSet}>
                    <IconButton className={classes.editBtn} onClick={this.openEditModal}>
                        <Edit />
                    </IconButton>
                    <IconButton className={classes.editBtn} onClick={this.tryToRemove}>
                        <DeleteForever />
                    </IconButton>
                </div>
            </div>) 
            : null}
            
            <Dialog
                open={this.state.isEditModalOpen}
                onClose={this.closeEditModal}
                aria-labelledby="edit-item-dialog-title"
                aria-describedby="edit-item-dialog-description"
                classes={{paper: cn(classes.dialog), }}
            >
                <Formik 
                    validate={this.validate}
                    enableReinitialize={true}
                    initialValues={{
                        id: this.props.item.id,
                        name: this.props.item.name,
                        description: this.props.item.description,
                    }}
                    onSubmit={this.submit}
                    render={({errors, status, touched, values}) => <div>
                        <Form>
                        <DialogTitle className={classes.editDialogTitle} id="edit-item-dialog-title">Edit <span className={classes.emphasizedName}>{`${this.props.item.name}`}</span></DialogTitle>
                        <DialogContent className={classes.editDialogContent}>
                            <Field type="text" name="id" className={classes.editId} disabled={true} value={values.id} />
                            <Field type="text" name="name" className={classes.editName}  value={values.name} />
                            {errors && errors.name && <div className={classes.error}>{errors.name}</div>}
                            <Field render={ ( {field, form:{values, errors}} ) => (<>
                                <textarea {...field} name="description" className={classes.descrArea} value={values.description}></textarea>
                                {errors && errors.description && <div className={classes.error}>{errors.description}</div>}
                            </>) }  />
                            <input name="file" type="file"
                                className="cloudinary-fileupload"
                                onChange={this.uploadImage}
                                ref={this.cloudinaryRef}
                            />
                        </DialogContent>
                        <DialogActions className={classes.modalControls}>
                            <Button className={classes.toBlock} onClick={this.tryToRemove} variant="contained" color="secondary">Remove</Button>
                            <Button type="submit" disabled={this.state.disabledForm} className={classes.toBlock} variant="contained" color="primary">Save</Button>
                        </DialogActions>
                        </Form>
                    </div>}
                />
            </Dialog>

            <Dialog
                open={this.state.isRemoveModalOpen}
                onClose={this.closeRemoveModal}
                aria-labelledby="remove-item-dialog-title"
                aria-describedby="remove-item-dialog-description"
                classes={{paper: classes.dialog}}
            >
                <DialogTitle className={classes.removeDialogTitle} id="remove-item-dialog-title">Remove <span className={classes.removeEmphasized}>{`${this.props.item.name}`}</span></DialogTitle>
                <DialogContent className={classes.removeDialogContent}>
                        <span>{'Are you sure to remove ' }</span>
                        <span className={classes.itemNameInModal}>{`${this.props.item.name}`}</span>
                        <span>{' from store?'}</span>
                </DialogContent>
                <DialogActions className={classes.modalControls}>
                    <Button className={classes.toBlock} onClick={this.closeRemoveModal} variant="contained">Cancel</Button>
                    <Button className={classes.toBlock} onClick={this.removeItemFromStore} variant="contained" color="secondary">Remove</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={this.state.isSnackOpen}
                onClose={this.closeSnack}
                autoHideDuration={6000}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <SnackbarContent
                    message={<div>
                        <span>
                            {
                                this.props.serverData && this.props.serverData.message && this.state.uploadedStatus ? this.props.serverData.message : null                             
                            }
                            {
                                this.state.uploadedStatus ? this.state.uploadedImageMsg : ''
                            }
                        </span>
                        <IconButton style={{display: 'inline-block'}} color="inherit" style={{color: "white"}} onClick={this.closeSnack}>
                            <Close/>
                        </IconButton>
                    </div>}
                />
            </Snackbar>
        </div>
    }
}

const mapStateToprops = state => ({
    serverData: state.adminReducer.serverData,
    productEdited: state.adminReducer.productEdited,
});
const mapDispatchToprops = dispatch => ({
    removeItem: id => dispatch(removeItem(id)),
    saveChanges: newData => dispatch(saveChanges(newData)),
});

export default compose(
    connect(mapStateToprops, mapDispatchToprops),
    withStyles(styles),
)(ProductRow);
