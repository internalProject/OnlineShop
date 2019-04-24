const styles = {
    navBar: {
        minHeight: '50px',
        backgroundColor: '#333',
        color: 'white',
        width: '100%',
        marginBottom: '-12px',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',

    },
    navLinks: {
        listStyleType: 'none',
        display: 'block',
        // height: '100%',
    },
    navLi: {
        display: 'inline-block',
        minWidth: '150px',
        cursor: 'pointer',
        '&:hover': {
            background: 'radial-gradient(#827717, #111)'
        },
        height: '100%',
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
    }
}

export default styles;