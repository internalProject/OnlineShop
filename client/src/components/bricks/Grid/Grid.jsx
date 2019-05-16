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


class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            descriptionVisisbility: false,
        };
    }

    componentDidMount = () => {
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
        this.props.pickOne(subtitutionalItems);
    }
    
    removeFromCart = itemId => e => {
        this.props.removeFromCart(itemId);
    }

    goToOrderAddress = () => {
        this.props.history.push('/order-address');
    }

    render = () => {
        const {classes} = this.props;

        return <div className={classes.gridHolder}>
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
                        disabled={this.props.items && (this.props.items.length <= 0) ? true: false}
                        onClick={this.goToOrderAddress}
                        size="large" variant="contained"
                        classes={{root: classes.continueBtn}}
                    >Continue</Button>
                </div>
            </div>
            
        </div>;
    }
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

