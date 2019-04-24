import React from 'react';
import cn from 'classnames';
import './UserProfileFrame.scss';


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
                    inner drop
                </div>
            </> : null}
        </div>
    }
}

export default UserProfileFrame;


