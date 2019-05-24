import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Home from './Home';
import Cart from './Cart';
import SignIn from './bricks/SignIn';
import SignUp from './bricks/SignUp';
import OrderAddress from './bricks/OrderAddress';
import Profile from './bricks/Profile';
import UserOrders from './bricks/UserOrders';


const Main = props => {

    return (<Router>
        <Switch>
            {/* Login, Register, Cart, Profile */}
            <Route exact path="/" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/order-address" render={() => ((props.pickedItems && (props.pickedItems.length <= 0))  || (props.user && !props.user.id) ? <Redirect to="/"/> : <OrderAddress/>)} />
            <Route path="/profile" render={() => (props.isLoggedIn ? <Profile /> : <Redirect to="/" />)} />
            <Route path="/my-orders" render={() => {
                console.log('whow warning with invitation to login.');
                return props.isLoggedIn ? <UserOrders /> : <Redirect to="/" />;
            }} />
        </Switch>
    </Router>)
}

const mapStateToProps = state => ({
    pickedItems: state.cartReducer.picked,
    isLoggedIn: state.userReducer.isLoggedIn,
    user: state.userReducer.user.user,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Main);