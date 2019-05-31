import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles, IconButton, Button, Snackbar, SnackbarContent, } from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText} from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';
import styles from './styles.js';
import {removeItem,saveChanges, } from '../../../actions/adminActions.js';
import cn from 'classnames';

class ProductRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            isRemoveModalOpen: false,
            isEditModalOpen: false,
            isSnackOpen: false,
        }
    }

    // TODO: 
    // 1. handle hooks, handle snack on remove-callback,
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
        if (this.props.serverData && this.props.serverData.message ) {
            this.setState({isSnackOpen: true});
        }
    }

    shouldComponentUpdate = nextProps => {
        if (this.props.serverData !== null && ( this.props.serverData.message === nextProps.serverData.message)) 
        { 
            return false;
        }
        return true;
    }

    changeDescriptionText = e => {
        this.setState({description: e.target.value, });
    }

    changeNameText = e => {
        this.setState({name: e.target.value});
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
        this.setState({isSnackOpen: false});
    }
     
    render = () => {
        const {classes} = this.props;

        return <div>{
            this.props.item ?
            (<div className={classes.item}>
                <div className={classes.id}>{this.props.item.id}</div>
                <div className={classes.name}>{this.props.item.name}</div>
                <div className={classes.description}>{this.props.item.description}</div>
                <IconButton className={classes.editBtn} onClick={this.openEditModal}>
                    <Edit />
                </IconButton>
            </div>) 
            : null}
            
            <Dialog
                open={this.state.isEditModalOpen}
                onClose={this.closeEditModal}
                aria-labelledby="edit-item-dialog-title"
                aria-describedby="edit-item-dialog-description"
                classes={{paper: cn(classes.dialog), }}
            >
                <DialogTitle className={classes.editDialogTitle} id="edit-item-dialog-title">Edit <span className={classes.emphasizedName}>{`${this.props.item.name}`}</span></DialogTitle>
                <DialogContent className={classes.editDialogContent}>
                        <input className={classes.editId} disabled={true} value={this.props.item.id} />
                        <input className={classes.editName} onChange={this.changeNameText} value={this.state.name} />
                        <textarea onChange={this.changeDescriptionText} className={classes.descrArea} value={this.state.description}></textarea>
                </DialogContent>
                <DialogActions className={classes.modalControls}>
                    <Button className={classes.toBlock} onClick={this.tryToRemove} variant="contained" color="secondary">Remove</Button>
                    <Button className={classes.toBlock} onClick={this.closeEditModal} variant="contained" color="primary">Save</Button>
                </DialogActions>
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
                                this.props.serverData && this.props.serverData.message ? this.props.serverData.message : null                                
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
});
const mapDispatchToprops = dispatch => ({
    removeItem: id => dispatch(removeItem(id)),
    saveChanges: newData => dispatch(saveChanges(newData)),
});

export default compose(
    connect(mapStateToprops, mapDispatchToprops),
    withStyles(styles),
)(ProductRow);

