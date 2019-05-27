const styles = {
    togglesSignInMenu : {
        width: '196px',
        backgroundColor: '#333',
        border: '2px solid white',
        left: '-2px',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%',
    },
    regLinkWrapper: {
        height: '100%',
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerLinks: {
        color: 'white',
        textDecoration: 'none',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            background: 'radial-gradient(#827717, #111)'
        },
    },
    linkTextHook: {
        display: 'block',
    }
};

export default styles;