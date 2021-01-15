import React from 'react';
import { Empty, Spin } from 'antd';
import Message from '../Message/Message';
import classNames from 'classnames';
import './Messages.scss';
import { Modal } from 'antd';

const Messages = ({ items,
    onRemoveMessage,
    isLoading,
    messagesRef,
    user,
    setPreviewImage,
    previewImage
}) => {

    return <div className="chat__dialog-messages"
        style={{ height: `calc(100% - 245px` }}
    >
        <div ref={messagesRef}
            className={classNames('messages', { 'messages--loading': isLoading })}>
            {isLoading ? (
                <Spin size="large" tip="Загрузка сообщений..." />
            ) : items && !isLoading ? (
                items.length > 0 ?
                    items.map((item) => {
                        return < Message
                            key={item._id}
                            isMe={user && user._id === item.user._id}
                            onRemoveMessage={onRemoveMessage.bind(this, item._id)}
                            setPreviewImage={setPreviewImage}
                            {...item}
                        />
                    }) : <Empty description="Диалог пуст" />
            ) : (
                        <Empty description="Откройте диалог" />
                    )}
            <Modal
                visible={!!previewImage}
                onCancel={() => setPreviewImage(null)}
                footer={null}
            >
                <img src={previewImage} style={{ width: '100%' }} alt="Preview" />
            </Modal>
        </div>
    </div>
}

export default Messages;