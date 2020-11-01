import React from 'react';
import { Empty, Spin } from 'antd';
import Message from '../Message/Message';
import classNames from 'classnames';
import './Messages.scss';

const Messages = ({ items, isLoading, messageRef }) => {
    return <div ref={messageRef}
        className={classNames('messages', { 'messages--loading': isLoading })}>
        {isLoading ? (
            <Spin size="large" tip="Загрузка сообщений..." />
        ) : items && !isLoading ? (
            items.length > 0 ?
                items.map((items) => {
                    return < Message  {...items} />
                }) : <Empty description="Диалог пуст" />
        ) : (
                    <Empty description="Откройте диалог" />
                )}
    </div>
}

export default Messages;