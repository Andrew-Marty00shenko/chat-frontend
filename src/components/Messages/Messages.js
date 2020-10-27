import React from 'react';
import { Empty } from 'antd';
import Message from '../Message/Message';

const Messages = ({ items }) => {
    return items ?
        <div>
            {items.map((items, index) => {
                return < Message key={index} {...items} />
            })}
        </div>
        :
        <Empty description="Откройте диалог" />
}

export default Messages;