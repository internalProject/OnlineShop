import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core';
import Nav from '../Nav';
import {Link} from 'react-router-dom';
import styles from './styles.js';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render = () => {
        const {classes} = this.props;

        return  <header className={classes.header}>
            <h1 className={classes.title}><Link className={classes.mainLink} to="/">Military Shop</Link></h1>
            <Nav/>
        </header>
    }
}

// const mapStateToProps = state => ({

// })

// const mapDispatchToProps = dispatch => ({
    
// })
export default compose(
    // connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(Header);
