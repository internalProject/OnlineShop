import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import {withStyles, TextField, IconButton, Button, Snackbar, SnackbarContent,} from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import {NavigateBefore, NavigateNext} from '@material-ui/icons';
import {findItems, clearSearchResult, } from '../../../actions/adminActions.js';
import ProductRow from '../ProductRow';
import AddNewProduct from '../AddNewProduct';
import styles, {root} from './styles.js';
import cn from 'classnames';

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
            changeSelect: 'names',
            offset: 0,
            btnsForDisplay: [],
        };
        this.searchBarRef =  React.createRef();
    }
    
    componentDidMount = () => {
        this.findItemsByQuery( );
    }

    componentDidUpdate = prevProps => {
        if ( (this.props.searchCounter !== prevProps.searchCounter) && this.props.searchResult.message !== '' && (this.props.searchResult.items.length === 0) ) {
            this.setState({isSnackOpen: true, searchMsg: true, removeMsg: false, createdMsg: false, })
        }
        if ( (this.props.itemRemoveCounter !== prevProps.itemRemoveCounter) && this.props.serverData.message !== '') {
            this.setState({isSnackOpen: true, removeMsg: true, searchMsg: false, createdMsg: false, })
        }
        if ( (this.props.productCreatedCounter !== prevProps.productCreatedCounter) && this.props.createdProduct !== null ) {
            this.setState({isSnackOpen: true, removeMsg: false, searchMsg: false, createdMsg: true, })
            this.findItemsByQuery();
        }
        if (
                (this.props.searchCounter !== prevProps.searchCounter) ||
                (this.props.itemRemoveCounter !== prevProps.itemRemoveCounter)
            ) {
            var newArray = new Array(Math.ceil(this.props.searchResult.items.length / 3));
            for (let i = 0; i < newArray.length; i++) {
                newArray[i] = i+1;
            }
            this.setState({btnsForDisplay: newArray, offset: 0});
        }
    }

    setQuery = e => {
        this.setState({searchTerm: e.target.value, });
    }

    findItemsByQuery = () => {
        this.props.findItems({term: this.state.searchTerm.trim(), fieldBy: this.state.changeSelect,});
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
        // this.searchBarRef.current.value = '';
        this.setState({searchTerm: ''});
    }

    changeSelect = e => {
        this.setState({changeSelect: e.target.value})
    }

    seePrev = () => {
        this.setState({offset: this.state.offset - 3});
    }

    seeNext = () => {
        this.setState({offset: this.state.offset + 3});
    }

    render = () => {
        const {classes} = this.props;
        
        let pagingButtons = this.state.btnsForDisplay.map( (empty, index) => {  return <Button
            key={index}
            className={cn(this.state.offset / 3 === index ? classes.currentPage : null )}
            style={{color: 'white'}}
            onClick={() => this.setState({offset: 3 * index})}
            >{index + 1}</Button>; } )

        return <div className={classes.page}>
            <div className={classes.searchBar}>
                <div className={classes.searchContainer}>
                    <label>
                        Select search field:
                        <select className={classes.searchSelect} defaultValue="names" value={this.state.selectValue} onChange={this.changeSelect}>
                            <option value="names">Names</option>
                            <option value="id">id</option>
                        </select>
                    </label>
                    {/* <label htmlFor="searchField">Search product by ID or Name: </label> */}
                    <input value={this.state.searchTerm} ref={this.searchBarRef} id="searchField" onChange={this.setQuery} className={classes.searchField} type="text"/>
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
                    this.props.searchResult.items.slice(this.state.offset, this.state.offset+3).map( item => <ProductRow key={item.id} item={item} /> )
                    : null
                }
            </div>
            <div className={classes.paging}>
                <IconButton disabled={
                    this.state.offset === 0 ?
                    true : false
                } className={classes.pagingBtn} onClick={this.seePrev}><NavigateBefore /></IconButton>
                {pagingButtons}
                <IconButton disabled={
                    this.state.offset + 3 >= this.props.searchResult.items.length ?
                    true : false
                } className={classes.pagingBtn} onClick={this.seeNext}><NavigateNext /></IconButton>
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

