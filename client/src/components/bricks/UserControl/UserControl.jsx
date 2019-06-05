import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles, Button, IconButton, Typography} from '@material-ui/core';
import {Paper,} from '@material-ui/core';
import {FormGroup, FormControlLabel, Switch} from '@material-ui/core';
import AdminPanel from '../AdminPanel';
import UserOrdersDialog from '../UserOrdersDialog';
import {UnfoldMore} from '@material-ui/icons'
import {getAllUsers, alternateUserStatus, } from '../../../actions/adminActions.js';
import styles from './styles.js';
import withSizes from 'react-sizes';
import cn from 'classnames';

class UserControl extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isOrdersDialogOpen: false,
        }
    }
    
    componentDidMount = () => {
        this.props.getAllUsers();
    }

    switchUserStatus = userId => {
        this.props.alternateUserStatus(userId);
    }

    closeOrdersDialog = () => {
        this.setState({isOrdersDialogOpen: false,});
    }

    openOrderDialog = () => {
        this.setState({isOrdersDialogOpen: true})
    }

    render = () => {
        const {classes} = this.props;

        return <div >
            <AdminPanel />
            <div className={classes.wrapperAligner}>
            <div className={classes.tableWrapper}>
                <Typography>Users</Typography>
                <div className={classes.table}>
                    <div className={classes.tableHead}>
                        <div className={classes.tableRow}>
                            <div className={classes.colId}>Id</div>
                            <div className={classes.colName}>Name</div>
                            <div className={classes.colEmail}>em@il</div>
                            <div className={classes.colAddress}>Address</div>
                            <div className={classes.colRole}>Role</div>
                            <div className={classes.colDisabled}>Disabled</div>
                            <div className={classes.colOrders}>Orders</div>
                        </div>
                    </div>
                    <div className={classes.tableBody}>
                        {
                        this.props.users ? 
                            (this.props.isLarge ? 
                                this.props.users.map( (user, index) => {
                                    return <div key={index} className={classes.tableRow}>
                                        <div className={classes.colId}>{user.id}</div>
                                        <div className={classes.colName}>{user.name}</div>
                                        <div className={classes.colEmail}>{user.email}</div>
                                        <div className={classes.colAddress}>{user.address}</div>
                                        <div className={classes.colRole}>{user.role === 1 ? 'Admin' : 'User'}</div>
                                        <div className={cn(classes.colDisabled, classes.vertAlign)}>
                                            <FormGroup>
                                                <FormControlLabel control={
                                                    <Switch checked={user.disabled} onChange={() => { this.switchUserStatus(user.id) }}/>
                                                } 
                                                label={ user.disabled ? 'Disabled': 'Active'}/>
                                            </FormGroup>
                                        </div>
                                        <div className={cn(classes.colOrders, classes.ordersBtnAlign)}>
                                            <IconButton onClick={this.openOrderDialog}><UnfoldMore /></IconButton>
                                            <UserOrdersDialog
                                                isOrdersDialogOpen={this.state.isOrdersDialogOpen}
                                                closeOrdersDialog={this.closeOrdersDialog}
                                                user={user}
                                            />
                                        </div>
                                    </div>
                                })
                                :
                                this.props.users.map( (user, index) => {
                                    return <div key={index} className={classes.tableRow}>
                                        <div className={classes.tRowPair}>
                                            <div className={cn(classes.colId, classes.leftCol)}>Id</div>
                                            <div className={cn(classes.colId, classes.rightCol)}>{user.id}</div>
                                        </div>
                                        <div className={classes.tRowPair}>
                                            <div className={cn(classes.colName, classes.leftCol)}>Name</div>
                                            <div className={cn(classes.colName, classes.rightCol)}>{user.name}</div>
                                        </div>
                                        <div className={classes.tRowPair}>
                                            <div className={cn(classes.colEmail, classes.leftCol)}>em@il</div>
                                            <div className={cn(classes.colEmail, classes.rightCol)}>{user.email}</div>
                                        </div>
                                        <div className={classes.tRowPair}>
                                            <div className={cn(classes.colAddress, classes.leftCol)}>Address</div>
                                            <div className={cn(classes.colAddress, classes.rightCol)}>{user.address}</div>
                                        </div>
                                        <div className={classes.tRowPair}>
                                            <div className={cn(classes.colRole, classes.leftCol)}>Role</div>
                                            <div className={cn(classes.colRole, classes.rightCol)}>{user.role === 1 ? 'Admin' : 'User'}</div>
                                        </div>
                                        <div className={classes.tRowPair}>
                                            <div className={cn(classes.colDisabled, classes.leftCol,)}>Disabled</div>
                                            <div className={cn(classes.colDisabled, classes.rightCol, classes.vertAlign)}>
                                                <FormGroup>
                                                    <FormControlLabel control={
                                                        <Switch checked={user.disabled} onChange={ () => {this.switchUserStatus(user.id)} } />
                                                    } 
                                                    label={ user.disabled ? 'Disabled': 'Active'}/>
                                                </FormGroup>
                                            </div>
                                        </div>
                                        <div className={classes.tRowPair}>
                                            <div className={cn(classes.colOrders, classes.leftCol)}>Orders</div>
                                            <div className={cn(classes.colOrders, classes.rightCol)}>
                                                <IconButton onClick={this.openOrderDialog}><UnfoldMore /></IconButton>
                                                <UserOrdersDialog
                                                    isOrdersDialogOpen={this.state.isOrdersDialogOpen}
                                                    closeOrdersDialog={this.closeOrdersDialog}
                                                    user={user}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                })
                            ) 
                        : null
                        }
                    </div>
                </div>
            </div>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({
    users: state.adminReducer.users,
});
const mapDispatchToProps = dispatch => ({
    getAllUsers: () => dispatch(getAllUsers()),
    alternateUserStatus: userId => dispatch(alternateUserStatus(userId)),
});

const mapSizeToProps = ({width}) => ({
    isLarge: width > 1000
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withSizes(mapSizeToProps),
)(UserControl);

