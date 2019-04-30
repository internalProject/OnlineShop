import React from 'react';
import styles from './styles.js';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles, IconButton} from '@material-ui/core';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import {pickOne} from '../../../actions/cartActions.js';

const importAll = r => {
    return r.keys().map(r);
}
  
const images = importAll(require.context('../../../../assets', false, /\.(png|jpe?g|svg)$/));

class BestSellers extends React.Component {
    constructor(props){
        super(props);
    }

    addItemToCart = e => {
        let chosenItem = null; // TODO: find one.

        this.props.pickOne(chosenItem);
    }

    render = () => {
        const {classes} = this.props;
        console.dir(this.props.picked);

        return <section className={classes.bestSellers}>
            <h3>Bestsellers</h3>
            <div className={classes.grid}>
                {
                    this.props.bestSellersItems ?
                    this.props.bestSellersItems.map(
                        (item, i) => <div key={item.id} className={classes.gridItem}>
                            <div className={classes.itemInnerShell}>
                                <h4>{item.name}</h4>
                                <div><img className={classes.itemImage} src={`../../../..${images.filter(i => {
                                    if (i.indexOf(item.name) !== -1) return true;
                                    return false;
                                })[0]}`}/></div>
                                <div className={classes.itemDescription}>{item.description}</div>
                                <div>
                                    <IconButton onClick={this.addItemToCart}><AddShoppingCart /></IconButton>
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

