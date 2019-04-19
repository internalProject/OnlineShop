import React from 'react';
import {withStyles, withTheme} from '@material-ui/core';
import Header from './bricks/Header.jsx';

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

const Home = props => {
    const {classes} = props;
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


export default withStyles(styles)(Home);