import React from 'react';
import ls from'local-storage';
import {connect} from 'react-redux';
import {compose} from 'redux';
import cn from 'classnames';
import './UserProfileFrame.scss';
import {exit} from '../../../actions/userActions.js';
import ExitToApp from '@material-ui/icons/ExitToApp';
import {IconButton, withStyles} from '@material-ui/core';

const styles = ({

});

class UserProfileFrame extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {

        return <div
        className={cn(
            'drops-menu',
            this.props.showUPF ? 'higher': ''
        )}
        >
            {this.props.showUPF ?
            <>
                <div className={cn(
                    'inner-drop-menu',
                    this.props.showUPF ? 'go-down': ''
                )}>
                    <ul>
                        <li>
                            <IconButton onClick={this.props.exit}>
                                <ExitToApp />
                            </IconButton>
                        </li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </> : null}
        </div>
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    'exit': () => dispatch(exit()),
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(UserProfileFrame);


