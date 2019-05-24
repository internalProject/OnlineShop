import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core';
import styles from './styles.js';
import {getAllUserOrders} from '../../../actions/userActions';

class OrdersGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.props.getAllUserOrders(this.props.user.id);
    }

    componentDidUpdate = prevProps => {
        console.dir(this.props.user);
    }

    render = () => {
        const {classes} = this.props;

        return (<div className={classes.ordersGrid}>
            <div style={{color: 'white'}} className={classes.gridWrapper}>
                {
                    this.props.user && Array.isArray(this.props.user.orders) ? 
                    this.props.user.orders.map(o => (
                        <div key={o.id}>
                            <div>{o.date} -  Id: {o.id}</div>
                            <div>
                                <ul>
                                    {o.products.map( p =>
                                        <li key={p.product.id}><span>{p.product.id}</span>  <span>{p.product.name}</span>  <span>{p.quantity}</span></li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    )) :
                    null  
                }
            </div>
        </div>);
    }
}

const mapStateToProps = state => ({
    user: state.userReducer.user,
});
const mapDispatchToProps = dispatch => ({
    getAllUserOrders: id => dispatch(getAllUserOrders(id)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(OrdersGrid);

