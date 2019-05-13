const styles = theme => ({
    bestSellers: {
        color: 'white',
        margin: '20px 0px',
    },
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '20px 40px',

        ['@media (max-width: 640px)']: {
            justifyContent: 'center',
        },

    },
    gridItem: {
        margin: '10px 30px',
        height: '200px',
        color: 'black',
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '10px',
        minWidth: '200px',
        width: '300px',

        ['@media (max-width: 640px)']:{
            width: '450px',
            height: 'initial',
        },
    },
    itemInnerShell: {
        overflow: 'hidden',
        overflowY: 'scroll',
        height: '180px',
        ['@media (max-width: 640px)']:{
            height: 'initial',
            overflow: 'auto'
        },
    },
    cardField: {
        margin: '15px 0px',
    },
    cardTitle: {
        fontSize: '1.5em',
    },
    itemImage: {
        maxHeight: '80px',
        borderRadius: '4px',
        border: `2px solid ${theme.primary.green}`,
    },
    itemDescription: {
        
    },
});

export default styles;