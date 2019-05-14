import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles, IconButton,} from '@material-ui/core';
import {Info, Add, Remove,} from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles.js';
import {pickOne, removeFromCart} from '../../../actions/cartActions.js';
import cn from 'classnames';

const importAll = r => {
    return r.keys().map(r);
}
  
const images = importAll(require.context('../../../../assets', false, /\.(png|jpe?g|svg)$/));

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            descriptionVisisbility: false,
        };
        this.descriptionRef = React.createRef();
    }

    componentDidMount = () => {
        // console.log(this.props);
        // console.log(images);
    }

    hideDescription = e => {
        this.descriptionRef.current.style.display = 'none';
    }

    showDescription = e => {
        this.descriptionRef.current.style.display = 'block';
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
        pickedType.quantity -= 1;

        let selectedIndex = null;
        subtitutionalItems.forEach((item, index) => {
            if (item.id === pickedType.id) selectedIndex = index;
        })

        if (selectedIndex === null) {
            subtitutionalItems.push(pickedType);
        } else {
            subtitutionalItems.splice(selectedIndex, 1, pickedType);
        }
        this.props.pickOne(subtitutionalItems);
    }
    
    removeFromCart = itemId => e => {
        this.props.removeFromCart(itemId);
    }

    render = () => {
        const {classes} = this.props;
        // console.log(this.descriptionRef);

        return <div className={classes.gridHolder}>
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
                            onMouseEnter={this.showDescription}
                            onMouseLeave={this.hideDescription}
                        >
                            <span className={classes.itemInfo}>
                                <Info/>
                                <div ref={this.descriptionRef} className={classes.itemDescription}>
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
)(Grid);

