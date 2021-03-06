const styles = theme => ({
    header: {
        minHeight: '120px',
        backgroundColor: theme.primary.green,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Abril Fatface',
        fontSize: '32pt',
        marginBottom: '30px',
    },
    mainLink: {
        color: 'white',
        textDecoration: 'none',
        '&:visited': {
            color: 'white',
        }
    }
});

export default styles;