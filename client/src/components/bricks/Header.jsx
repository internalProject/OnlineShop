import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    header: {
        height: '80px',
        backgroundColor: theme.primary.green,
    },
})

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render = () => {
        const {classes} = this.props;

        return  <header className={classes.header}>{this.props.children}</header>
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles))
(Header);