import React from 'react';
import {Badge} from '@material-ui/core';
import {styles, imgWrapper, iconStyles} from './styles.js';
import './styles.scss';

const UserIcon = (props) => {
    return (<div style={styles}>
        <Badge classes={{root: 'badge'}} badgeContent={props.cartItems} color="primary">
            <div style={imgWrapper}>
                <img src={props.imgUrl} style={iconStyles} alt="User Avatar"/>
            </div>
        </Badge>
    </div>)
}

export default UserIcon;