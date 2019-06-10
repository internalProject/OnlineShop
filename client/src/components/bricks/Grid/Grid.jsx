import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {withStyles, IconButton, Button} from '@material-ui/core';
import {Snackbar, SnackbarContent,} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import {Info, Add, Remove,} from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles.js';
import SignIn from '../SignIn';
import {pickOne, removeFromCart, clearCart} from '../../../actions/cartActions.js';
import cn from 'classnames';
import ls from 'local-storage';

const importAll = r => {
    return r.keys().map(r);
}
  
const images = importAll(require.context('../../../../assets', false, /\.(png|jpe?g|svg)$/));
let descrBoard = null;


class Grid extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            isBlockSnackOpen: false,
        }
    }

    hideDescription = item => e => {
        descrBoard.style.display = 'none';
    }

    showDescription = item => e => {
        descrBoard = e.target.querySelector('span div');
        descrBoard.style.display = 'block';
    }

    addOne = transitItem => e => {
        let subtitutionalItems = [...this.props.items];
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
        this.props.pickOne(subtitutionalItems);
    }

    removeOne = transitItem => e => {
        let subtitutionalItems = [...this.props.items];
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
        this.props.pickOne(subtitutionalItems);
    }
    
    removeFromCart = itemId => e => {
        this.props.removeFromCart(itemId);
    }

    closeBanSnack = () => {
        this.setState({isBlockSnackOpen: false,});
    }

    clearCart = () => {
        this.props.clearCart();
    }

    goToOrderAddress = () => {
        if (!this.props.isLoggedIn) {
            return;
        }
        if (this.props.user.disabled || this.props.user.roleId === 1) {
            this.setState({isBlockSnackOpen: true,});
            return;
        }
        this.props.history.push('/order-address');
    }

    render = () => {
        const {classes} = this.props;

        return (<div className={classes.gridHolder}>
            <div className={classes.innerShell}>
                <div className={classes.gridHeader}>
                    <div className={classes.infoField}>info</div>
                    <div className={classes.itemId}>id</div>
                    <div className={classes.itemName}>name</div>
                    <div className={classes.itemQuantity}>quantity</div>
                </div>

                {
                    this.props.items ? (this.props.items.map((item, i) => 
                        <div className={classes.item} key={item.id}>
                            <div 
                                className={classes.infoField}
                                onMouseEnter={this.showDescription(item)}
                                onMouseLeave={this.hideDescription(item)}
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
                                <IconButton className={classes.qunatElem} size="small" variant="contained" onClick={this.removeOne(item)}>
                                    <Remove/>
                                </IconButton>
                                <span className={cn(classes.numberPlace, classes.qunatElem)}>{item.quantity}</span>
                                <IconButton className={classes.qunatElem} size="small" variant="contained" onClick={this.addOne(item)}>
                                    <Add/>
                                </IconButton>
                                <IconButton onClick={this.removeFromCart(item.id)} variant="contained" size="small">
                                    <DeleteIcon />
                                </IconButton>
                            </div>

                        </div>
                    )) : null
                }
                <hr className={classes.hr}/>
                <div className={classes.continueBtnWrapper}>
                    <Button
                        variant="contained"
                        className={classes.clearCart}
                        size="small"
                        onClick={this.clearCart}
                        disabled={this.props.items.length <= 0}
                        >Clear Cart</Button>
                    <Button
                        disabled={this.props.items && (this.props.items.length <= 0) ? true: false}
                        onClick={this.goToOrderAddress}
                        size="large" variant="contained"
                        classes={{root: classes.continueBtn}}
                    >Continue</Button>
                </div>
                {!this.props.isLoggedIn ?
                    <div className={classes.loginWrapper}>
                        <div>To make order first you have to</div><div className={classes.signInShell}><SignIn/></div>
                    </div>: 
                    null
                }
                <Snackbar
                open={this.state.isBlockSnackOpen}
                onClose={this.closeBanSnack}
                autoHideDuration={6000}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                >
                    <SnackbarContent
                        classes={{root: classes.errorSnack}}
                        message={<div>
                            <span>{'You are not able to make orders!'}</span>
                            <IconButton style={{display: 'inline-block'}} color="inherit" style={{color: "white"}} onClick={this.closeBanSnack}>
                                <Close/>
                            </IconButton>
                        </div>}
                    />
                </Snackbar>
            </div>
            
        </div>);
    }
}

const mapStateToProps = state => ({
    items: state.cartReducer.picked,
    isLoggedIn: state.userReducer.isLoggedIn,
    user: state.userReducer.user,
    serverData: state.adminReducer.serverData,
});
const mapDispatchToProps = dispatch => ({
    pickOne: item => dispatch(pickOne(item)),
    removeFromCart: itemId => dispatch(removeFromCart(itemId)),
    clearCart: () => dispatch(clearCart()),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(withRouter(Grid));

