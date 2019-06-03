import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withStyles, IconButton, Button, Snackbar, SnackbarContent,} from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import {findItems} from '../../../actions/adminActions.js';
import ProductRow from '../ProductRow';
import styles from './styles.js';

class ProductGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
            isSnackOpen: false,
            removeMsg: false,
            searchMsg: false,
            newProductFormState: false,
        }
    }
    
    componentDidUpdate = prevProps => {
        if ( (this.props.searchCounter !== prevProps.searchCounter) && this.props.searchResult.message !== '' ) {
            this.setState({isSnackOpen: true, searchMsg: true, removeMsg: false})
        }
        if ( (this.props.itemRemoveCounter !== prevProps.itemRemoveCounter) && this.props.serverData.message !== '') {
            this.setState({isSnackOpen: true, removeMsg: true, searchMsg: false,})
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
});
const mapDispatchToProps = dispatch => ({
    findItems: query => dispatch(findItems(query)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(ProductGrid);

