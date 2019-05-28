const styles = {
    page: {
        color: 'white',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    profileWrapper: {
        height: '250px',
        width: '300px',
        marginTop: '100px',
    },
    formShell: {
        color: 'white',
    },
    fieldSet: {
        border: '2px solid white',
    },
    formLegend: {
        fontFamily: 'Abril Fatface',
        fontSize: '2.5em',
    },
    field: {
        padding: '3px 6px',
        fontSize: '16px',
        color: '#ff5722',
        fontWeight: '600',
        borderRadius: '16px',
        maxWidth: '170px',
    },
    fieldWrapper: {
        display: 'flex',
        // justifyContent: 'center',
    },
    fieldNlabel: {
        width: '85%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    toWhite: {
        color: 'white',
        width: '15%',
    },
    toBlock: {
        display: 'block',
    },
    red: {
        color: 'red',
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
        color: 'white',
        backgroundColor: 'red',
        margin: '2px 6px 6px 6px',
        padding: '3px',
        borderRadius: '3px',
    },
    submitBtnContainer: {
        margin: '20px',
        display: 'flex',
        justifyContent: 'center',
    },
}

export default styles;