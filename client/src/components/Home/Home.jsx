import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withStyles} from '@material-ui/core';
import Header from '../bricks/Header';
import BestSellers from '../bricks/BestSellers';
import styles from './styles.js';
import {pingServer, } from '../../actions/ctrlActions.js';
import {Image, Transformation, } from 'cloudinary-react';

const Home = props =>{

    const ping = async () => {
        
    }

    const {classes} = props;

    return (<div className={classes.page}>
        <Header/>
        <main className={classes.main}>
            <div className={classes.columnHolder}>
                {/* <div className={classes.columnRow}></div>
                <div className={classes.columnRow}></div>
                <div className={classes.columnRow}></div> */}
                <BestSellers />
            </div>
        </main>
        <footer className={classes.footer}>footer</footer>
    </div>)
}

const mapStateToProps = state => ({
    user: state.userReducer.user
});

const mapDispatchToProps = dispatch => ({
    pingServer: () => dispatch(pingServer()),
})

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(Home);