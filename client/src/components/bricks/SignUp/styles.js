
import green from '@material-ui/core/colors/green';

const styles = theme => ({
    signUpPage: {
        height: '100%',
        width: '100%',
        color: 'white',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("./assets/recruit.jpg")',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
    },
    navBar: {
        height: '50px',
        backgroundColor: theme.primary.green,
        width: '100%',
        paddingLeft: '120px',
    },
    linkWrapper: {
        display: 'inline-block',
        height: '100%',
        padding: '15px 30px',
        '&:hover': {
            cursor: 'pointer',
            background: 'radial-gradient(#827717, #111)',
        }
    },
    navLink: {
        ...theme.link,
        color: 'white'
    },
    registerForm: {
        width: '100%',
        maxWidth: '400px',
        height: '500px',
        marginTop: '100px',
        ['@media (max-width: 640px)']: {
            marginTop: '100px',
        }
    },
    regFormLegend: {
        fontFamily: 'Abril Fatface',
        fontSize: '2.5em',
        ['@media (max-width: 640px)']: {
            fontSize: '1.8em',
        },
    },
    fieldset: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    field: {
        border: '2px solid white',
        borderRadius: '5px',
        margin: '20px 20px',
        display: 'block',
        width: '80%',
        height: '40px',
        fontSize: '24px'
    },
    label: {
        color: 'goldenrod',
        fontFamily: 'Abril Fatface',
        fontSize: '24px',
        display: 'block',
    },
    saveFormBtn: {
        backgroundColor: 'goldenrod',
        color: 'white',
        fontWeight: 'bolder',
        float: 'right',
        margin: '20px',
        '&:disabled': {
            backgroundColor: '#555',
            color: 'white',
        }
    },
    error: {
        fontSize: '16px',
        color: 'red',
    },
    success: {
        backgroundColor: green[600],
        color: 'white',
        width: '285px',
        height: '100px',
        borderRadius: '10px',
    },
    snackMsg: {
        display: 'flex',
        justifyContent: 'space-around',
    },

})

export default styles;