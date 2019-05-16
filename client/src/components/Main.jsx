import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Home from './Home';
import Cart from './Cart';
import SignIn from './bricks/SignIn';
import SignUp from './bricks/SignUp';
import OrderAddress from './bricks/OrderAddress';


class Main extends React.Component {
    constructor(props) {
        super(props)
    }

    render = () => {
    return <Router>
        <Switch>
            {/* Login, Register, Cart, Profile */}
            <Route exact path="/" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/order-address" render={() => (this.props.pickedItems && (this.props.pickedItems.length <= 0) ? <Redirect to="/"/> : <OrderAddress/>)} />
        </Switch>
    </Router>
    }
}

const mapStateToProps = state => ({
    pickedItems: state.cartReducer.picked,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Main);