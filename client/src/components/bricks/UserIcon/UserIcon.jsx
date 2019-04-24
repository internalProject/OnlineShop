import React from 'react';
import {styles, imgWrapper, iconStyles} from './styles.js';

// TODO rewright to class-component;
// why: any access to user by redux.props
const UserIcon = (props) => {
    return <div style={styles}>
        <div style={imgWrapper}>
            <img src={props.imgUrl} style={iconStyles} alt="User Avatar"/>
        </div>
    </div>
}

export default UserIcon;