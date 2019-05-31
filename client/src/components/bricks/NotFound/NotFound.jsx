import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core';
import styles from './styles.js';

class NotFound extends React.Component {
    render = () => {
        const {classes} = this.props;

        return <div className={classes.page}>Page not Found.</div>;
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(NotFound);

