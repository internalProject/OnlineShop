import React from 'react';

const styles = {
    display: 'inline-block',
    height: '40px',
    width: '40px',
}

const imgWrapper = {
    borderRadius: '50% 50%',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const iconStyles = {
    width: '75%',
    display: 'block'
}

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