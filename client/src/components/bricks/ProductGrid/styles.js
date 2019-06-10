const styles = {
    page: {
        height: '656px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        ['@media (max-width: 510px)']: {
            height: 'auto',
            paddingTop: '50px',
        },
    },
    searchBar: {
        margin: '20px',
        marginTop: '-47px',
    },
    warning: {
        backgroundColor: 'rgba(255, 255, 0, 0.5)',
        color: 'black',
    },
    removed: {
        backgroundColor: '#64dd17',
        color: 'white',
    },
    createNewProduct: {
        display: 'inline-block',
        float: 'right',
        ['@media (max-width: 510px)']: {
            float:'initial',
            paddingTop: '15px',
        },
    },
    searchSelect: {
        padding: '3px 15px',
        fontSize: '14px',
        fontFamily: 'Roboto',
        backgroundColor: '#333',
        color: 'white',
        fontWeight: '600',
        border: 'none',
    },
    searchField: {
        width: '180px',
    },
    searchResult: {
        minHeight: '100px',
    },
    paging: {
        width: '100%',
        padding: '15px',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    pagingBtn: {
        display: 'inline-block',
        color: 'white',
        fontSize: 'em',
    },
    currentPage: {
        backgroundColor: '#333',
    },
}


export default styles;