import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withStyles} from '@material-ui/core';
import Header from '../bricks/Header';
import BestSellers from '../bricks/BestSellers';
import styles from './styles.js';

const Home = props =>{

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
})

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(Home);