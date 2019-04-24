import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Home';
import Cart from './Cart.jsx';
import SignIn from './bricks/SignIn';
import SignUp from './bricks/SignUp';

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
        </Switch>
    </Router>
    }
}
export default Main;