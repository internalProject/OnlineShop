import React from 'react';
import ls from'local-storage';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Link} from 'react-router-dom';
import cn from 'classnames';
// import './UserProfileFrame.scss';
import {exit} from '../../../actions/userActions.js';
import ExitToApp from '@material-ui/icons/ExitToApp';
import {IconButton, withStyles} from '@material-ui/core';
import styles from './styles.js';

// const styles = ({
//     exitBtn: {
//         color: 'white',
//     },
//     logoutText: {
//         fontSize: '16px',
//     },
//     menuLi: {
//         width: '100%',
//     }
// });

class UserProfileFrame extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        const {classes} =  this.props;

        return <div
        className={cn(
            // 'drops-menu',
            classes.dropsMenu,
            // this.props.showUPF ? 'higher': ''
            this.props.showUPF ? classes.higher: ''
        )}
        >
            {this.props.showUPF ?
            <>
                <div className={cn(
                    // 'inner-drop-menu',
                    classes.innerDropMenu,
                    // this.props.showUPF ? 'go-down': ''
                    this.props.showUPF ? classes.goDown: ''
                )}>
                    <ul>
                        <li className={classes.menuLi}>
                            <IconButton className={classes.liContent} style={{color: 'white'}} onClick={this.props.exit}><span className={classes.logoutText}>Log out                    </span>  
                                <ExitToApp />
                            </IconButton>
                        </li>
                        <li className={classes.menuLi}>
                            <Link className={classes.liContent} to="/cart"><div>Cart</div></Link> 
                            {/* apply classes.menuLi for this Link */}
                        </li>
                        <li className={classes.menuLi}></li>
                    </ul>
                </div>
            </> : null}
        </div>
    }
}

const mapStateToProps = state => ({
    user: state.userReducer.user,
});

const mapDispatchToProps = dispatch => ({
    'exit': () => dispatch(exit()),
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(UserProfileFrame);


