import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core';
import styles from './styles.js';
import Header from '../bricks/Header';
import Grid from '../bricks/Grid';

class Cart extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        const {classes} = this.props;

        return <div className={classes.cartPage}>
            <Header/>
            <Grid/>
        </div>;
    }
}

const mapStateToProps = state => ({

});
const mapDispatchToProps = dispatch => ({

});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(Cart);
