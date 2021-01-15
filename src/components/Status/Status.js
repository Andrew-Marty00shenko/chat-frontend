import React from 'react';
import './Status.scss';
import classnames from 'classnames';

const Status = ({ online, fullname }) => {
    return <div className="chat__dialog-header">
        <div className="chat__dialog-header-center">
            <b className="chat__dialog-header-username">
                {fullname}
            </b>
            <span className={classnames("status ", { "status--online": online })}>
                {online ? 'онлайн' : 'офлайн'}
            </span>
        </div>
    </div>
}

export default Status;