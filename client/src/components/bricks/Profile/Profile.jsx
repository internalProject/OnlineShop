import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core';
import {withRouter} from 'react-router';
import cn from 'classnames';
import styles from './styles.js';


class Profile extends React.Component {
    render = () => {
        const {classes} = this.props;

        return <div className={classes.page}>Profile</div>;
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

