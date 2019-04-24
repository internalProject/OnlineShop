import React from 'react';
import {withStyles} from '@material-ui/core';
import UserProfileFrame from '../UserProfileFrame';
import UserIcon from '../UserIcon'; // Db.getUser(id).icon;
import iconUrl from '../../../../assets/soldier-svgrepo-com.svg';
import styles from './styles.js';

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