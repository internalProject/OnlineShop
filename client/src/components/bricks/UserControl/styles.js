const styles = {
    tableWrapper: {
        padding: '10px',
        backgroundColor: 'white',
        color: '#444',
        maxWidth: '1000px',
        margin: '20px',
        borderRadius: '5px',
    },
    table: {
        overflow: 'scroll',
    },
    tableRow: {
        padding: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid #444',
        '&:not(:last-child)': {
            borderBottom: '1px solid #eee',
        },
    },
    colId: {
        width: '8%',
        margin: '0px 8px',
    },
    colName: {
        width: '20%',
        margin: '0px 8px',
    },
    colEmail: {
        width: '20%',
        margin: '0px 8px',
    },
    colAddress: {
        width: '20%',
        margin: '0px 8px',
    },
    colRole: {
        width: '10%',
        margin: '0px 8px',
    },
    colDisable: {
        width: '10%',
        margin: '0px 8px',
    },
    colOrders: {
        width: '8%',
        margin: '0px 8px',
    }
}

export default styles;