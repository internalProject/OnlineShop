import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Home.jsx';
import Cart from './Cart.jsx';

const Main = props => <Router>
    <Switch>
        <Route exact path="/" component={Home} />
        {/*Login, Register, Cart, Profile */}
        <Route path="/cart" component={Cart} />
    </Switch>
</Router>

export default Main;