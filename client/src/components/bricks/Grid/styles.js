import { GridListTileBar } from "@material-ui/core";
import { PlayCircleFilledWhite } from "@material-ui/icons";

const styles = theme => ({
    gridHolder: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    innerShell: {
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    item: {
        display: 'flex',
        margin: '15px 25px',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        color: 'black',
        borderRadius: '5px',
    },
    gridHeader: {
        display: 'flex',
        margin: '15px 25px',
        color: 'white',
    },
    infoField: {
        width: '50px',
        padding: '5px 10px',
    },
    itemInfo: {
        cursor: 'pointer',
        display: 'inline-block',
        position: 'relative',
        flexGrow: '1',
    },
    itemId: {
        padding: '5px 10px',
        width: '100px',
    },
    itemName: {
        padding: '5px 10px',
        width: '150px',
    },
    itemQuantity: {
        padding: '5px 10px',
        width: '200px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    quantElem: {
        display: 'inline-block',
    },    
    numberPlace: {
        margin: '0px 15px',
        paddingTop: '14px',
    },
    itemDescription: {
        display: 'none',
        position: 'absolute',
        borderRadius: '4px',
        backgroundColor: 'rgba(75, 83, 32, 0.8)',
        color: 'white',
        left: '-100px',
        top: '-50px',
        width: '300px',
        padding: '10px',
        zIndex: '99999',
    },
    hr: {
        height: '2px',
        backgroundColor: 'white',
        borderRadius: '5px',
        width: '500px',
        margin: '20px 0px',
    },
    continueBtnWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        padding: '0px 20px', 
    },
    continueBtn: {
        backgroundColor: theme.primary.green,
        color: 'white',
        display: 'block',
    },
    signInShell: {
        borderBottom: '1px solid #f44336',
    },
    clearCart: {
        alignSelf: 'flex-start',
        display: 'block',
    },
    loginWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        padding: '0px 20px', 
        color: 'white',
    },
})

export default styles;