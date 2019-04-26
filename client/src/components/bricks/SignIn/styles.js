const styles = theme => ({
    loginModalWrapper: {
        display: 'inline-block',
    },
    field: {
        borderRadius: '5px',
        margin: '20px 20px',
        display: 'block',
        width: '80%',
        height: '40px',
        fontSize: '24px',
        background: '#424242',
        color: 'white',
        '&::placeholder': {
            color: 'rgba(255, 215, 0, 0.5)'
        },
    },
    label: {
        color: 'goldenrod',
        fontFamily: 'Abril Fatface',
        fontSize: '24px',
        display: 'block',
    },
    signInBtn: {
        color: theme.secondary.white,
        textTransform: 'none',
    },
    signInFormBtn: {
        ...styles.signInBtn,
        color: 'white',
        backgroundColor: theme.primary.green,
    },
    error: {
        fontSize: '16px',
        color: 'red',
    },
});

export default styles;