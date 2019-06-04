import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles, IconButton, Button, Snackbar, SnackbarContent,} from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import {findItems, clearSearchResult, } from '../../../actions/adminActions.js';
import ProductRow from '../ProductRow';
import AddNewProduct from '../AddNewProduct';
import styles from './styles.js';

class ProductGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
            isSnackOpen: false,
            removeMsg: false,
            searchMsg: false,
            createdMsg: false,
            newProductFormState: false,
        };
        this.searchBarRef =  React.createRef();
    }
    
    componentDidUpdate = prevProps => {
        if ( (this.props.searchCounter !== prevProps.searchCounter) && this.props.searchResult.message !== '' ) {
            this.setState({isSnackOpen: true, searchMsg: true, removeMsg: false, createdMsg: false, })
        }
        if ( (this.props.itemRemoveCounter !== prevProps.itemRemoveCounter) && this.props.serverData.message !== '') {
            this.setState({isSnackOpen: true, removeMsg: true, searchMsg: false, createdMsg: false, })
        }
        if ( (this.props.productCreatedCounter !== prevProps.productCreatedCounter) && this.props.createdProduct !== null ) {
            this.setState({isSnackOpen: true, removeMsg: false, searchMsg: false, createdMsg: true, })
        }
    }

    setQuery = e => {
        this.setState({searchTerm: e.target.value, });
    }

    findItemsByQuery = () => {
        this.props.findItems(this.state.searchTerm);
    }

    closeSnack = () => {
        this.setState({isSnackOpen: false});
    }

    newProductFormHandler = () => {
        this.setState({newProductFormState: false,});
    }

    openNewPropductForm = () => {
        this.setState({newProductFormState: true,});
    }

    clearSearchResultAndBar = () => {
        this.props.clearSearchResult();
        this.searchBarRef.current.value = '';
    }

    render = () => {
        const {classes} = this.props;

        return <div className={classes.page}>
            <div className={classes.searchBar}>
                <div className={classes.searchContainer}>
                    <label htmlFor="searchField">Search product by ID or Name: </label>
                    <input ref={this.searchBarRef} id="searchField" onChange={this.setQuery} className={classes.searchField} type="text"/>
                    <IconButton style={{color: 'white'}} onClick={this.findItemsByQuery}>
                        <Search className={classes.searchIcon}/>
                    </IconButton>
                    <Button variant="contained" size="small" onClick={this.clearSearchResultAndBar}>Clear Searh Result</Button>

                    <Button className={classes.createNewProduct} variant="contained" size="medium" color="primary" onClick={this.openNewPropductForm}>Create New Product</Button>
                </div>
            </div>
            <div className={classes.addNewProduct}>

                <AddNewProduct newProductFormState={this.state.newProductFormState} newProductFormHandler={this.newProductFormHandler} openNewPropductForm={this.openNewPropductForm} />
            </div>
            <div className={classes.searchResult}>
                {
                    this.props.searchResult && this.props.searchResult.items ? 
                    this.props.searchResult.items.map( item => <ProductRow key={item.id} item={item} /> )
                    : null
                }
            </div>

            <Snackbar
                open={this.state.isSnackOpen}
                onClose={this.closeSnack}
                autoHideDuration={6000}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <SnackbarContent
                    classes={{root: this.state.removeMsg ? classes.removed : classes.warning}}
                    message={<div>
                        <span>
                            {
                                this.state.searchMsg && this.props.searchResult && this.props.searchResult.message ? this.props.searchResult.message : null                                
                            }
                            {
                                this.state.removeMsg && this.props.serverData && this.props.serverData.message ? this.props.serverData.message : null 
                            }
                            {
                                this.state.createdMsg && this.props.createdProduct ? this.props.createdProduct.message : null
                            }
                        </span>
                        <IconButton style={{display: 'inline-block'}} color="inherit" style={{color: "white"}} onClick={this.closeSnack}>
                            <Close style={{color: 'black'}}/>
                        </IconButton>
                    </div>}
                />
            </Snackbar>
        </div>;
    }
}

const mapStateToProps = state => ({
    searchResult: state.adminReducer.searchResult,
    serverData: state.adminReducer.serverData,
    searchCounter: state.adminReducer.searchCounter,
    itemRemoveCounter: state.adminReducer.itemRemoveCounter,
    createdProduct: state.adminReducer.createdProduct,
    productCreatedCounter: state.adminReducer.productCreatedCounter,
});
const mapDispatchToProps = dispatch => ({
    findItems: query => dispatch(findItems(query)),
    clearSearchResult: () => dispatch(clearSearchResult()),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(ProductGrid);

