import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles, IconButton, Button} from '@material-ui/core';
import styles from './styles.js';
import OrderDetail from '../OrderDetail';
import {getAllUserOrders, } from '../../../actions/adminActions.js';
import {Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import cn from 'classnames';

class UserOrdersDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount = () => {
        this.props.getAllUserOrders(this.props.user.id);
    }

    componentDidUpdate = prevProps => {
        if (this.props.user.id !== prevProps.user.id) {
            this.props.getAllUserOrders(this.props.user.id);
        }
    }
    
    render = () => {
    const {classes} = this.props;

    return  (
    <Dialog
        open={this.props.isOrdersDialogOpen}
        onClose={this.props.closeOrdersDialog}
        classes={{papper: cn(classes.dialog)}}
    >
        <DialogTitle>
            <div className={classes.dialogTitle}>
                <div>Orders of <span>{`${this.props.user.name}`}</span></div>
                <div><IconButton onClick={this.props.closeOrdersDialog}><CloseIcon /></IconButton></div>
            </div>
        </DialogTitle>
        <DialogContent>
            {
                this.props.userOrders ?
                this.props.userOrders.map( order => {
                    return <OrderDetail order={order} key={order.id} />;
                })
                : null 
            }
        </DialogContent>
    </Dialog>)
    }
}

const mapStateToProps = state => ({
    userOrders: state.adminReducer.userOrders,
});
const mapDispatchToProps = dispatch => ({
    getAllUserOrders: userId => dispatch(getAllUserOrders(userId)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(UserOrdersDialog);

