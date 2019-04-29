import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Main from './Main.jsx';
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

const App = props => <MuiThemeProvider theme={theme}>
    <CssBaseline/>
    <Main/>
</MuiThemeProvider>

export default App;