const styles = {
    wrapperAligner: {
        display: 'flex',
        justifyContent: 'center',
        ['@media (max-width: 1000px)']: {
            display: 'block',
        },
    },
    tableWrapper: {
        padding: '10px',
        backgroundColor: 'white',
        color: '#444',
        margin: '20px',
        maxWidth: '1000px',
        borderRadius: '5px',
    },
    table: {
        maxWidth: '1000px',
        overflow: 'scroll',
    },
    tableHead: {
        ['@media (max-width: 1000px)']: {
            display: 'none',
        },
    },
    tableRow: {
        padding: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid #444',
        '&:not(:last-child)': {
            borderBottom: '1px solid #eee',
            margin: '15px 0px',
        },
        ['@media (max-width: 1000px)']: {
            flexDirection: 'column',
        },
    },
    tRowPair: {
        display: 'flex',
        justifyContent: 'space-between',
        '&:nth-of-type(2n)': {
            backgroundColor: '#eee',
        },
        '&:last-child': {
            margin: '30px 0px',
        },
    },
    leftCol: {
        width: '30% !important', // or important or have to create new class to replace colName, colId ... classes. (important - laconic)
    },
    rightCol: {
        width: '70% !important',
    },
    colId: {
        width: '100px',
        margin: '0px 8px',
        height: '30px',
        paddingTop: '4px',
    },
    colName: {
        width: '150px',
        margin: '0px 8px',
        height: '30px',
        paddingTop: '4px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    colEmail: {
        width: '150px',
        margin: '0px 8px',
        height: '30px',
        paddingTop: '4px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    colAddress: {
        width: '150px',
        margin: '0px 8px',
        height: '30px',
        paddingTop: '4px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    colRole: {
        width: '150px',
        margin: '0px 8px',
        height: '30px',
        paddingTop: '4px',
    },
    colDisabled: {
        width: '200px',
        margin: '0px 8px',
        height: '30px',
        paddingTop: '4px',
    },
    vertAlign: {
        marginTop: '-13px',
    },
    colOrders: {
        width: '100px',
        margin: '0px 8px',
        height: '30px',
        paddingTop: '4px',
    },
    ordersBtnAlign: {
        marginTop: '-20px',
    },
    '@global': {
        'p > li': { // this is how to set general css rules
            color: 'yellow',
            backgroundColor: 'green',
        },
    },

}

export default styles;