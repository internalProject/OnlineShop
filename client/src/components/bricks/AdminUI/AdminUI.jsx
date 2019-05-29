import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core';
import AdminSignIn from '../AdminSignIn';
import styles from './stlyes.js';

class AdminUI extends React.Component {
    render = () => {
        const {classes} = this.props;

        return (
            // this.props.admin && this.props.admin.id ?
            <div style={{color: 'white', }}>{'Welcome you, master!'}</div>
            //: <AdminSignIn />
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

