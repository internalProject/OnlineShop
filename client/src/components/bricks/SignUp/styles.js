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
        justifyContent: 'center',
    },
    registerForm: {
        width: '100%',
        maxWidth: '400px',
        height: '500px',
        marginTop: '200px',
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
    }
})

export default styles;