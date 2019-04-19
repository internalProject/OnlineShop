import React from 'react';
import {withStyles} from '@material-ui/core';

const styles = {
    dropsMenu: {
        width: '200px',
        backgroundColor: '#333',
        border: '2px solid white',
        borderTop: '2px solid #333',
        position: 'absolute',
        top: '46px',
        left: '-2px',
    }
}

class UserProfileFrame extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        const {classes} = this.props;

        return <div
        className={classes.dropsMenu}
        style={{
            display: this.props.showUPF ? 'block': 'none',
        }}>
            drops menu
        </div>
    }
}

export default withStyles(styles)(UserProfileFrame);


