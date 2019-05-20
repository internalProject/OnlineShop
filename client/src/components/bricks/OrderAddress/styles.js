const style = theme => ({
    pageWrapper: {
        color: 'white',
    },
    pageContent: {
        padding: '20px 0px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        color: 'white',
        margin: '30px',
    },
    innerShell: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '500px',
    },
    form: {
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: '5px',
        border: `2px solid ${theme.primary.green}`,
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 30px',
        fontSize: '1.5em',
    },
    formElement: {
        display: 'block',
        margin: '10px',
    },
    addressField: {
        height: '100px',
        fontSize: '1em',
        padding: '10px',
        '&::placeholder': {
            fontSize: '1em',
        },

    },
    sendBtn: {
        width: '150px',
        alignSelf: 'flex-end',
    },
    snackError: {
        backgroundColor: 'red',
        color: 'white',
    },
    snackSuccess: {
        backgroundColor: '#00c853',
        color: 'white',
    },
    error: {
        color: 'red',
    },
});

export default style;