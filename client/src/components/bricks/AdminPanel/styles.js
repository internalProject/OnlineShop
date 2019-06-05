const styles = theme => ({
    panel: {
        backgroundColor: theme.primary.green,
        color: 'white',
    },
    labelHolder: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.primary.green,
        height: '80px',
        fontSize: '17pt',
    },
    panelWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#333',
        ['@media (max-width: 650px)']: {
            flexDirection: 'column',
        },
    },
    linkList: {
        listStyleType: 'none',
        display: 'flex',
        backgroundColor: '#333',
    },
    adminLink: {
        padding: '8px',
        display: 'block',
        minWidth: '150px',
        cursor: 'pointer',
        '&:hover': {
            background: 'radial-gradient(#827717, #111)'
        },
        height: '100%',
        ['@media (max-width: 640px)']: {
            display: 'block',
            height: 'inherit'
        },
    },
    link: {
        color: 'white',
        fontFamily: 'Roboto',
        fontSize: '24px',
        width: '100%',
        height: '100%',
        textDecoration: 'none',
        display: 'inline-block',
        textAlign: 'center',
        paddingTop: '12px',
    },
    loggedUserShell: {
        backgroundColor: '#333',
    },
});

export default styles;