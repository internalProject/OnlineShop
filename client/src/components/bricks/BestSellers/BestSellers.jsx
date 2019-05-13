import React from 'react';
import styles from './styles.js';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles, IconButton} from '@material-ui/core';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import {pickOne} from '../../../actions/cartActions.js';
import cn from 'classnames';

const importAll = r => {
    return r.keys().map(r);
}
  
const images = importAll(require.context('../../../../assets', false, /\.(png|jpe?g|svg)$/));

class BestSellers extends React.Component {
    constructor(props){
        super(props);
    }

    /// TODO: reduce call part;
    addItemToCart = chosenItem => e => {
        let subtitutionalItems = [...this.props.pickedItems];
        let pickedType = this.props.pickedItems.filter(item => {
            if (item.id === chosenItem.id) return true;
            return false;
        })[0];
        if (pickedType === undefined) {
            pickedType = {
                ...chosenItem,
                quantity: 0,
            };
        }
        pickedType.quantity += 1;

        let selectedIndex = null;
        subtitutionalItems.forEach((item, index) => {
            if (item.id === pickedType.id) selectedIndex = index;
        })
        if (selectedIndex === null) {
            subtitutionalItems.push(pickedType);
        }
        subtitutionalItems.splice(selectedIndex, 1, pickedType);
        console.log(subtitutionalItems);
        this.props.pickOne(subtitutionalItems);
    }

    componentDidUpdate = () => {
    }

    render = () => {
        const {classes} = this.props;

        return <section className={classes.bestSellers}>
            <h3>Bestsellers</h3>
            <div className={classes.grid}>
                {
                    this.props.bestSellersItems ?
                    this.props.bestSellersItems.map(
                        (item, i) => <div key={item.id} className={classes.gridItem}>
                            <div className={classes.itemInnerShell}>
                                <h4 className={cn(classes.cardField, classes.cardTitle)}>{item.name}</h4>
                                <div className={cn(classes.cardField,)}><img className={classes.itemImage} src={`../../../..${images.filter(i => {
                                    if (i.indexOf(item.name) !== -1) return true;
                                    return false;
                                })[0]}`}/></div>
                                <div className={cn(classes.itemDescription, classes.cardField)}>{item.description}</div>
                                <div className={cn(classes.cardField,)}>
                                    <IconButton onClick={this.addItemToCart(item)}><AddShoppingCart /></IconButton>
                                </div>
                            </div>
                        </div>)
                    : null
                }
            </div>
        </section>
    }
}

const mapStateToProps = state => ({
    bestSellersItems: state.userReducer.stuff, 
    pickedItems: state.cartReducer.picked,
});

const mapDispatchToProps = disptch => ({
    pickOne: item => disptch(pickOne(item)),
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(BestSellers);

