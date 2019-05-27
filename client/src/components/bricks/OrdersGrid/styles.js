const styles = {
    ordersGrid: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px',
        ['@media (max-width: 640px)']: {
            marginTop: '200px',
        },
        ['@media (min-width: 640px) and (max-width: 816px)']: {
            marginTop: '65px',
        },
    },
    gridWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}
export default styles;