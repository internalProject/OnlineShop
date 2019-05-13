const styles = {
    dropsMenu: {
        width: '200px',
        backgroundColor: '#333',
        border: '2px solid white',
        borderTop: '2px solid #333',
        position: 'absolute',
        top: '46px',
        left: '-2px',
        height: '0px',
        transition: '0.5s height',
        overflow: 'hidden',

        ['@media (max-width: 816px)']: {
            top: '40px',
        }
    },
    higher: {
        height: '80px',
    },
    innerDropMenu: {
        position: 'absolute',
        height: '20px',
        top: '-20px',
        transition: '0.5s top',
        width: '100%',
    },
    goDown: {
        top: '0px',
    },
    exitBtn: {
        color: 'white',
    },
    logoutText: {
        fontSize: '16px',
    },
    liContent: {
        width: '100%',
        color: 'white',
        textDecoration: 'none',
        display: 'flex',
        justifyContent: 'center',
    },
    menuLi: {
        // width: '100%',
        // color: 'white',
        // textDecoration: 'none',
        // display: 'block',
        display: 'block',
    }
}

export default styles;