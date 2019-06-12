const styles = theme => ({
    item: {
        display: 'flex',
        color: 'white',
        width: '500px',
        height: '150px',
        padding: '8px',
        border: '1px dashed #ccc',
        margin: '10px',
        borderRadius: '25px',
        ['@media (max-width: 510px)']: {
            width: 'auto',
            height: 'auto',
            flexDirection: 'column'
        },
    },
    id: {
        width: '10%',
        paddingTop: '50px',
        ['@media (max-width: 510px)']: {
            paddingTop: '0px',
            fontSize: '1.7em',
        },
    },
    name: {
        width: '20%',
        borderLeft: `2px solid ${theme.secondary.gray}`,
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '6px',
        // paddingTop: '50px',
        color: '#ff9800',
        ['@media (max-width: 510px)']: {
            width: 'auto',
            borderLeft: 'initial',
            paddingTop: '0px',
            flexDirection: 'row',
            justifyContent: 'space-around',
            fontSize: '2em',
        },
    },
    cloudImage: {
        display: 'block',
        width: '85px',
    },
    innerName: {
        marginBottom: '5px',
    },
    description: {
        width: '55%',
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: '10px',
        borderLeft: `2px solid ${theme.secondary.gray}`,
        ['@media (max-width: 510px)']: {
            width: 'auto',
            borderLeft: 'initial',
            fontSize: '1.2e',
        }
    },
    itemControlSet: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        ['@media (max-width: 510px)']: {
            flexDirection: 'row',
        },
    },
    editBtn: {
        color: 'white',
        display: 'block',
    },
    dialog: {
        width: '400px',
    },
    editName: {
        margin: '8px 13px',
        display: 'block',
        width: '90%',
        padding: '4px',
        borderRadius: '8px',
        color: '#e65100',
        fontWeight: 'bolder',
        fontSize: '20px',
    },
    editId: {
        margin: '8px 13px',
        display: 'block',
        width: '90%',
        padding: '4px',
        borderRadius: '8px',
        fontSize: '16px',
    },
    descrArea: {
        width: '320px',
        height: '120px',
        padding: '15px',
        borderRadius: '5px',
        fontSize: '16px',
        margin: '13px',
    },
    modalControls: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#e2e2e2',
        padding: '6px 15px',
        margin: '5px 20px',
        borderRadius: '5px',
    },
    toBlock: {
        display: 'inline-block',
    },
    emphasizedName: {
        backgroundColor: '#444',
        color: 'white',
        borderRadius: '18px',
        padding: '8px',
    },
    editDialogTitle: {

    },
    editDialogContent: {

    },
    itemNameInModal: {
        color: 'white',
        backgroundColor: 'red',
        borderRadius: '18px',
        padding: '8px',
        fontSize: '20px',
    },
    removeDialogTitle: {
        color: 'white',
    },
    removeDialogContent: {
        fontSize: '20px',
        color: 'red',
        padding: '30px'
    },
    error: {
        width: '90%',
        margin: '8px 13px',
        color: 'white',
        backgroundColor: 'red',
        padding: '6px',
        borderRadius: '13px',
        fontWeight: '600',
    }
});

export default styles;