import React from 'react';
import {connect} from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Main from './Main.jsx';
import {grabCartItemsFromLS,} from '../actions/cartActions.js';
import {isLoggedIn} from '../actions/userActions.js';
import '../../styles.scss';


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
        return <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <Main/>
        </MuiThemeProvider>
    }
}

const mapStateToPprops = state => ({
    
});

const mapDispatchToProps = dispatch => ({
    grabCartItemsFromLS: () => dispatch(grabCartItemsFromLS()),
    checkUserLoginStatus: () => dispatch(isLoggedIn()),
});

export default connect(mapStateToPprops, mapDispatchToProps,)(App);