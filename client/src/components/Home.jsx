import React from 'react';
import {withStyles, withTheme} from '@material-ui/core';
import bullets from '../../assets/bullets.jpg';
import Header from './bricks/Header.jsx';

const styles = theme => ({
    page: {
        height: '100%',
        color: 'white',
    },
    main: {
        height: 'calc(100% - 100px)',
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
    }
});

const Home = props => {
    const {classes} = props;
    return <div className={classes.page}>
        <Header/>
        <main className={classes.main}>
            <figure className={classes.banner}>
                <img className={classes.bannerImg} src={bullets} alt="Storefront Banner With Bullets" />
            </figure>
        </main>
        <footer className={classes.footer}>footer</footer>
    </div>
}


export default withStyles(styles)(Home);