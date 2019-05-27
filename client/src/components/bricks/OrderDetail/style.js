const styles = theme => ({
    order: {
    },
    itemRow: {
        width: '500px',
        border: `1px solid ${theme.secondary.gray}`,
        margin: '15px 0px',
    },
    pair: {
        display: 'flex',
        margin: '6px',
        '&:not(:last-child)': {
            borderBottom: `1px dashed ${theme.secondary.gray}`,
        }
    },
    dateStamp: {
        fontSize: '0.8em',
        color: theme.secondary.gray,
    },
    orderHeaderText: {
        color: theme.item.headerColor,
    },
    productId: {
        color: theme.secondary.gray,
    },
    fieldName: {
        width: '25%',
        borderRight: `1px dashed ${theme.secondary.gray}`,
    },
    fieldValue: {
        width: '75%',
        color: theme.item.headerColor,
        padding: '4px',
        paddingLeft: '10px',
    },
    itemDescriptionShell: {
        paddingRight: '18px',
    },
    itemDescription: {
        overflow: 'scroll',
        maxHeight: '130px',
        overflowX: 'hidden',
        overflowY: 'auto',
        color: 'white',
    }

})

export default styles;