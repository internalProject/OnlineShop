import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core';
import AdminPanel from '../AdminPanel';
import styles from './stlyes.js';

class AdminUI extends React.Component {
    render = () => {
        const {classes} = this.props;

        return (
            <div style={{color: 'white', }} className={classes.page}>
                <AdminPanel />
                <div>{'Welcome you, master!'}</div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    admin: state.adminReducer.admin,
});
const mapDispatchToProps = dispatch => ({});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(AdminUI);

