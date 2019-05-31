import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core';
import styles from './styles.js';
import AdminPanel from '../AdminPanel';
import ProductGrid from '../ProductGrid';

class ProductConfig extends React.Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        const {classes} = this.props;

        return <div className={classes.page}>
            <AdminPanel />
            <ProductGrid />
        </div>;
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(ProductConfig);

