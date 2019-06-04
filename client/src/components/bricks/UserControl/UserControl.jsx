import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles, Button, IconButton, Typography} from '@material-ui/core';
import {Paper,} from '@material-ui/core';
import {FormGroup, FormControlLabel, Switch} from '@material-ui/core';
import AdminPanel from '../AdminPanel';
import {UnfoldMore} from '@material-ui/icons'
import {getAllUsers, } from '../../../actions/adminActions.js';
import styles from './styles.js';

class UserControl extends React.Component {
    constructor(props) {
        super(props)

        this.setState = {

        }
    }
    
    componentDidMount = () => {
        this.props.getAllUsers();
    }

    render = () => {
        const {classes} = this.props;

        return <div>
            <AdminPanel />
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
                            <div className={classes.colorders}>Orders</div>
                        </div>
                    </div>
                    <div className={classes.tableBody}>
                        {
                            this.props.users ? 
                            this.props.users.map( (user, index) => {
                                return <div key={index} className={classes.tableRow}>
                                    <div className={classes.colId}>{user.id}</div>
                                    <div className={classes.colName}>{user.name}</div>
                                    <div className={classes.colEmail}>{user.email}</div>
                                    <div className={classes.colAddress}>{user.address}</div>
                                    <div className={classes.colRole}>{user.role === 1 ? 'Admin' : 'User'}</div>
                                    <div className={classes.colDisabled}>
                                        <FormGroup>
                                            <FormControlLabel control={
                                                <Switch checked={user.disabled} onChange={ () => event => { console.log(event.target.checked)} }/>
                                            } 
                                            label={ user.disabled ? 'Disabled': 'Active'}/>
                                        </FormGroup>
                                    </div>
                                    <div className={classes.colOrders}><IconButton><UnfoldMore /></IconButton></div>
                                </div>
                            }) 
                            : null
                        }
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
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(UserControl);

