const styles = {
    bestSellers: {
        color: 'white',
        margin: '20px 0px',
    },
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'space-around',
    },
    gridItem: {
        width: '27%',
        margin: '10px',
        height: '200px',
        color: 'black',
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '10px',
        
        ['@media (max-width: 640px)']:{
            width: '46%',
        },
    },
    itemInnerShell: {
        overflow: 'hidden',
        overflowY: 'scroll',
        height: '180px',
    },
    itemImage: {
        maxHeight: '80px',
    },
    itemDescription: {
        
    },
}

export default styles;