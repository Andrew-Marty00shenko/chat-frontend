import React from 'react';
import './WhiteBlock.scss';
import classNames from 'classnames';

const WhiteBlock = ({ children, className }) => {
    return (
        <div className={classNames('block', className)}>
            {children}
        </div>
    )
}

export default WhiteBlock;