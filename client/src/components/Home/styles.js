const styles = theme => ({
    page: {
        height: '100%',
        maxHeight: 'inherit',
        color: 'white',
    },
    main: {
        minHeight: 'calc(100% - 145px)',
        color: 'black'
    },
    footer: {
        height: '20px',
        backgroundColor: theme.primary.green,
    },
    banner: {
        height: '200px',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
    },
    bannerImg: {
        width: '100%',
        position: 'absolute',
        top: '-275px',
    },
    columnHolder: {
        display: 'felx',
        flexDirection: 'column',
        flexItems: 'center',
    },
    columnRow: {
        height: '250px',
    }
});

export default styles;