import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {withStyles, IconButton, Button} from '@material-ui/core';
import {Info, Add, Remove,} from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles.js';
import {pickOne, removeFromCart} from '../../../actions/cartActions.js';
import cn from 'classnames';
import ls from 'local-storage';

const importAll = r => {
    return r.keys().map(r);
}
  
const images = importAll(require.context('../../../../assets', false, /\.(png|jpe?g|svg)$/));
let descrBoard = null;


const Grid = props => {

    const hideDescription = item => e => {
        descrBoard.style.display = 'none';
    }

    const showDescription = item => e => {
        descrBoard = e.target.querySelector('span div');
        descrBoard.style.display = 'block';
    }

    const addOne = transitItem => e => {
        let subtitutionalItems = [...props.items];
        let searchResult = subtitutionalItems.filter(item => {
            if (item.id === transitItem.id) return true;
            return false;
        });
        let pickedType = null;
        if (searchResult.length === 0) {
            pickedType = {
                ...transitItem,
                quantity: 0,
            };
        } else {
            pickedType = searchResult[0];
        }
        pickedType.quantity += 1;

        let selectedIndex = null;
        subtitutionalItems.forEach((item, index) => {
            if (item.id === pickedType.id) selectedIndex = index;
        })

        if (selectedIndex === null) {
            subtitutionalItems.push(pickedType);
        } else {
            subtitutionalItems.splice(selectedIndex, 1, pickedType);
        }
        ls.set('ws-cart', subtitutionalItems);
        // localStorage.setItem('ws-cart', subtitutionalItems);
        props.pickOne(subtitutionalItems);
    }

    const removeOne = transitItem => e => {
        let subtitutionalItems = [...props.items];
        let searchResult = subtitutionalItems.filter(item => {
            if (item.id === transitItem.id) return true;
            return false;
        });
        let pickedType = null;
        if (searchResult.length === 0) {
            pickedType = {
                ...transitItem,
                quantity: 0,
            };
        } else {
            pickedType = searchResult[0];
        }
        if (pickedType.quantity > 1) {
            pickedType.quantity -= 1;
        } else {
            pickedType.quantity = 1;
        }

        let selectedIndex = null;
        subtitutionalItems.forEach((item, index) => {
            if (item.id === pickedType.id) selectedIndex = index;
        })

        if (selectedIndex === null) {
            subtitutionalItems.push(pickedType);
        } else {
            subtitutionalItems.splice(selectedIndex, 1, pickedType);
        }
        ls.set('ws-cart', subtitutionalItems);
        // localStorage.setItem('ws-cart', subtitutionalItems);
        props.pickOne(subtitutionalItems);
    }
    
    const removeFromCart = itemId => e => {
        props.removeFromCart(itemId);
    }

    const goToOrderAddress = () => {
        props.history.push('/order-address');
    }

    const {classes} = props;

    return (<div className={classes.gridHolder}>
        <div className={classes.innerShell}>
            <div className={classes.gridHeader}>
                <div className={classes.infoField}>info</div>
                <div className={classes.itemId}>id</div>
                <div className={classes.itemName}>name</div>
                <div className={classes.itemQuantity}>quantity</div>
            </div>

            {
                props.items ? (props.items.map((item, i) => 
                    <div className={classes.item} key={item.id}>
                        <div 
                            className={classes.infoField}
                            onMouseEnter={showDescription(item)}
                            onMouseLeave={hideDescription(item)}
                        >
                            <span className={classes.itemInfo}>
                                <Info/>
                                <div className={classes.itemDescription}>
                                    <p>{item.description}</p>
                                </div>
                            </span>
                        </div>
                        <div className={classes.itemId}>{item.id}</div>
                        <div className={classes.itemName}>{item.name}</div>
                        <div className={classes.itemQuantity}>
                            <IconButton className={classes.qunatElem} size="small" variant="contained" onClick={removeOne(item)}>
                                <Remove/>
                            </IconButton>
                            <span className={cn(classes.numberPlace, classes.qunatElem)}>{item.quantity}</span>
                            <IconButton className={classes.qunatElem} size="small" variant="contained" onClick={addOne(item)}>
                                <Add/>
                            </IconButton>
                            <IconButton onClick={removeFromCart(item.id)} variant="contained" size="small">
                                <DeleteIcon />
                            </IconButton>
                        </div>

                    </div>
                )) : null
            }
            <hr className={classes.hr}/>
            <div className={classes.continueBtnWrapper}>
                <Button
                    disabled={props.items && (props.items.length <= 0) ? true: false}
                    onClick={goToOrderAddress}
                    size="large" variant="contained"
                    classes={{root: classes.continueBtn}}
                >Continue</Button>
            </div>
        </div>
        
    </div>);
}

const mapStateToProps = state => ({
    items: state.cartReducer.picked,
});
const mapDispatchToProps = dispatch => ({
    pickOne: item => dispatch(pickOne(item)),
    removeFromCart: itemId => dispatch(removeFromCart(itemId)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(withRouter(Grid));

