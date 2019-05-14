import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core';

const styles = {};

class SomeClass extends React.Component {
    render = () => {
        const {classes} = this.props;

        return <div>hello</div>;
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(SomeClass);

