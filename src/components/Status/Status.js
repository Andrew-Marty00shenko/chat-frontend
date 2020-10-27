import React from 'react';
import './Status.scss';
import classnames from 'classnames';

const Status = ({ online }) => {
    return <span className={classnames("status ", { "status--online": online })}>
        {online ? 'онлайн' : 'офлайн'}
    </span>
}

export default Status;