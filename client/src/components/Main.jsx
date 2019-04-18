import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Home.jsx';

const Main = props => <Router>
    <Switch>
        <Route exact path="/" component={Home} />
        {/*Login, Register, Cart, Profile */}
    </Switch>
</Router>

export default Main;