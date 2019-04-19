import React from 'react';
import {withStyles} from '@material-ui/core';
import UserProfileFrame from './UserProfileFrame.jsx';
import UserIcon from './UserIcon.jsx'; // Db.getUser(id).icon;
import iconUrl from '../../../assets/soldier-svgrepo-com.svg';

const styles = {
    userBtnWrapper: {
        width: '200px',
        border: '2px solid white',
        display: 'flex',
        position: 'relative',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        // height: '50px', TODO: implement smooth dropdown behavior
        // transition: '1s height ease'
    }
}

class UserBtn extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showUPF: false,
        }
    }

    showUserProfileFrame = (e) => {
        this.setState((state)=> ({
            showUPF: !state.showUPF,
        }))
        // if (this.state.showUPF) {
        //     e.target.style.height = '100px';
        // } else {
        //     e.target.style.height = '50px';
        // } BAD CODE: as a part of smoth dropdown
    }

    render = () => {
        const {classes} = this.props;

        return <div onClick={this.showUserProfileFrame} className={classes.userBtnWrapper}>
            <div className={classes.userName}>user Name</div>
            <UserIcon imgUrl={iconUrl} />
            <UserProfileFrame showUPF={this.state.showUPF}/>
        </div>
    }
}

export default withStyles(styles)(UserBtn);