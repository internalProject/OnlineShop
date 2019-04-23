import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core';
import Nav from './Nav.jsx';

const styles = theme => ({
    header: {
        minHeight: '120px',
        backgroundColor: theme.primary.green,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Abril Fatface',
        fontSize: '32pt',
        marginBottom: '30px',

    },
    
})

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render = () => {
        const {classes} = this.props;

        return  <header className={classes.header}>
            <h1 className={classes.title}>Military Shop</h1>
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
