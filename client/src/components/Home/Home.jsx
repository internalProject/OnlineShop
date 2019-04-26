import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withStyles} from '@material-ui/core';
import Header from '../bricks/Header';
// import {getUserData} from '../../actions/userActions.js';
import styles from './styles.js';

class Home extends React.Component {
    constructor(props){
        super(props);
    }

    render = () => {
        const {classes} = this.props;

        return <div className={classes.page}>
        <Header/>
        <main className={classes.main}>
            <div className={classes.columnHolder}>
                <div className={classes.columnRow}></div>
                <div className={classes.columnRow}></div>
                <div className={classes.columnRow}></div>
                <div className={classes.columnRow}></div>
                <div className={classes.columnRow}></div>
            </div>
        </main>
        <footer className={classes.footer}>footer</footer>
    </div>
    }
}

const mapStateToProps = state => ({
    user: state.userReducer.user
});

const mapDispatchToProps = dispatch => ({
    // 'getUserData': () => dispatch(getUserData()),
})

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(Home);