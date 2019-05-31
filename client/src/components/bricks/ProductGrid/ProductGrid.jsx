import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles, IconButton,} from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import {findItems} from '../../../actions/adminActions.js';
import ProductRow from '../ProductRow';
import styles from './styles.js';

class ProductGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
        }
    }
    
    setQuery = e => {
        this.setState({searchTerm: e.target.value, });
    }

    findItemsByQuery = () => {
        this.props.findItems(this.state.searchTerm);
    }

    render = () => {
        const {classes} = this.props;

        return <div className={classes.page}>
            <div className={classes.searchBar}>
                <div className={classes.searchContainer}>
                    <label htmlFor="searchField">Search product by ID or Name: </label>
                    <input id="searchField" onChange={this.setQuery} className={classes.searchField} type="text"/>
                    <IconButton onClick={this.findItemsByQuery}>
                        <Search className={classes.searchIcon}/>
                    </IconButton>
                </div>
            </div>
            <div className={classes.searchResult}>
                {
                    this.props.searchResult && this.props.searchResult.items ? 
                    this.props.searchResult.items.map( item => <ProductRow key={item.id} item={item} /> )
                    : null
                }
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({
    searchResult: state.adminReducer.searchResult,
});
const mapDispatchToProps = dispatch => ({
    findItems: query => dispatch(findItems(query)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(ProductGrid);

