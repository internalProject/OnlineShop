import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withStyles} from '@material-ui/core';
import Header from './bricks/Header.jsx';
import {getUserData} from '../actions/userActions.js';

const styles = theme => ({
    page: {
        height: '100%',
        maxHeight: 'inherit',
        color: 'white',
    },
    main: {
        minHeight: 'calc(100% - 200px)',
        color: 'black'
    },
    footer: {
        height: '20px',
        backgroundColor: theme.primary.green,
    },
    banner: {
        height: '200px',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
    },
    bannerImg: {
        width: '100%',
        position: 'absolute',
        top: '-275px',
    },
    columnHolder: {
        display: 'felx',
        flexDirection: 'column',
        flexItems: 'center',
    },
    columnRow: {
        height: '250px',
    }
});

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
    usre: state.userReducer.user
});

const mapDispatchToProps = dispatch => ({
    'getUserData': () => dispatch(getUserData()),
})

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(Home);