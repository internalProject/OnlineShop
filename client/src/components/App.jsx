import React from 'react';
import {connect} from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Main from './Main.jsx';
import {grabCartItemsFromLS,} from '../actions/cartActions.js';
import {isLoggedIn, getUserData} from '../actions/userActions.js';
import ls from 'local-storage';
import '../../styles.scss';

// let isUserDataCaught = false;

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    primary: {
        green: '#4b5320',
    },
    secondary: {
        white: '#ffffff',
        fontWeight: '600',
        gray: 'rgba(200, 200, 200, 0.6)',
    },
    item: {
        headerColor: '#ff9800',
    },
    link: {
        display: 'inline-block',
        textDecoration: 'none',
        height: '100%',
        width: '100%',
    }

})

// const App = props => 
class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.props.grabCartItemsFromLS();
        this.props.checkUserLoginStatus();
    }

    render = () => {
        return (<MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <Main/>
        </MuiThemeProvider>)
    }
}

const mapStateToPprops = state => ({
    loginStatus: state.userReducer.isLoggedIn,
    user: state.userReducer.user,
});

const mapDispatchToProps = dispatch => ({
    grabCartItemsFromLS: () => dispatch(grabCartItemsFromLS()),
    checkUserLoginStatus: () => dispatch(isLoggedIn()),
    getUserData: userName => dispatch(getUserData(userName)),
});

export default connect(mapStateToPprops, mapDispatchToProps,)(App);