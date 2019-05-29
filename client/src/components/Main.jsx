import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {withStyles, Button, IconButton, Snackbar, SnackbarContent,} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Home from './Home';
import Cart from './Cart';
import SignIn from './bricks/SignIn';
import SignUp from './bricks/SignUp';
import OrderAddress from './bricks/OrderAddress';
import Profile from './bricks/Profile';
import UserOrders from './bricks/UserOrders';
import AdminUI from './bricks/AdminUI';
import {openInfo, closeInfo, } from '../actions/ctrlActions.js';


class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isSnackOpen: false,
        }
    }

    shouldComponentUpdate = nextProps => {
        if (this.props.infoObj.isInfoMsgOpen === nextProps.infoObj.isInfoMsgOpen) return false;
        return true;
    }

    closeSnack = () => {
        this.setState({isSnackOpen: false,});
    }

    render = () => {

    return (
    <>
    <Snackbar
        open={this.props.infoObj.isInfoMsgOpen}
        onClose={this.props.closeInfo}
        autoHideDuration={6000}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
    >
        <SnackbarContent
            // classes={{root: (this.props.serverData.status === 'success' ? classes.snackSuccess : classes.snackError)}}
            message={<div>
                <span style={{display: 'inline-block'}} id="message-id">{this.props.infoObj.message ? this.props.infoObj.message: ''}</span>
                <IconButton style={{display: 'inline-block'}} color="inherit" style={{color: "white"}} onClick={this.props.closeInfo}>
                    <CloseIcon/>
                </IconButton>
            </div>}
        />
    </Snackbar>
    <Router>
        <Switch>
            {/* Login, Register, Cart, Profile */}
            <Route exact path="/" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/order-address" render={() => ((this.props.pickedItems && (this.props.pickedItems.length <= 0))  || (this.props.user && !this.props.user.id) ? <Redirect to="/"/> : <OrderAddress/>)} />
            <Route path="/profile" render={() => {
                return this.props.isLoggedIn ? <Profile /> : (() => { this.props.openInfo('To check user profile first login.'); return  <Redirect to="/" />; })() 
            } } />
            <Route path="/my-orders" render={() => {
                return this.props.isLoggedIn ? <UserOrders /> : (() => { this.props.openInfo('To check user orders first login.'); return <Redirect to="/" />; })() 
            }} />
            <Route path="/admin" component={AdminUI} />
        </Switch>
    </Router>
    </>)
    }
}

const mapStateToProps = state => ({
    pickedItems: state.cartReducer.picked,
    isLoggedIn: state.userReducer.isLoggedIn,
    user: state.userReducer.user.user,
    infoObj: state.ctrlReducer.infoObj,
});

const mapDispatchToProps = dispatch => ({
    openInfo: msg => dispatch(openInfo(msg)),
    closeInfo: () => dispatch(closeInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);