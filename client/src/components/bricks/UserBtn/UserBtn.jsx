import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core';
import UserProfileFrame from '../UserProfileFrame';
import UserIcon from '../UserIcon'; // Db.getUser(id).icon;
import iconUrl from '../../../../assets/soldier-svgrepo-com.svg';
import styles from './styles.js';
import ls from 'local-storage';
import {isLoggedIn} from '../../../actions/userActions.js';

const wrapItems = (acc, prevItem) => acc += prevItem.quantity;

class UserBtn extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showUPF: false,
            userName: '',
        }
    }

    showUserProfileFrame = (e) => {
        this.setState((state)=> ({
            showUPF: !state.showUPF,
        }))
    }

    componentDidMount = () => {
        if (this.props.isLoggedIn) {
            let name = ls.get('ws-name');
            this.setState({userName: name});
        }
    }

    componentDidUpdate = () => {
    }

    render = () => {
        const {classes} = this.props;

        return <div onClick={this.showUserProfileFrame} className={classes.userBtnWrapper}>
            <div className={classes.userName}>{
                this.props.user ? this.props.user.name : this.state.userName
            }</div>
            {this.props.picked ? <UserIcon cartItems={this.props.picked.reduce(wrapItems, 0)} imgUrl={iconUrl} /> : null}
            
            <UserProfileFrame showUPF={this.state.showUPF}/>
        </div>
    }
}

const mapStateToProps = state => ({
    user: state.userReducer.user.user,
    isLoggedIn: state.userReducer.isLoggedIn,
    picked: state.cartReducer.picked,
});

const mapDispatchToProps = dispatch => ({
    checkLogin: () => dispatch(isLoggedIn()),
});

export default compose(connect(
    mapStateToProps, mapDispatchToProps,
), withStyles(styles))(UserBtn);