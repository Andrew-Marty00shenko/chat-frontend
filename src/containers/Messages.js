import React, { useEffect, useRef, useState } from 'react';
import { messagesActions } from '../redux/actions';
import { connect } from 'react-redux';
import { Empty } from 'antd';
import BaseMessages from '../components/Messages/Messages';
import socket from '../core/socket';

const Messages = ({
    items,
    currentDialogId,
    addMessage,
    fetchMessages,
    isLoading,
    user,
    removeMessagebyId
}) => {
    const [previewImage, setPreviewImage] = useState(null);
    const messagesRef = useRef(null);

    const onNewMessage = (data) => {
        addMessage(data);
    };

    useEffect(() => {
        if (currentDialogId) {
            fetchMessages(currentDialogId);
            socket.on('SERVER:NEW_MESSAGE', onNewMessage);
            messagesRef.current.scrollTo(0, 999999);

            return () => {
                socket.removeListener('SERVER:NEW_MESSAGE', onNewMessage)
            }
        }
    }, [currentDialogId, items]);

    // useEffect(() => {

    // }, [items])

    if (!currentDialogId) {
        return <Empty description="Откройте диалог" />;
    }

    return <BaseMessages
        user={user}
        messagesRef={messagesRef}
        items={items}
        isLoading={isLoading && !user}
        onRemoveMessage={removeMessagebyId}
        setPreviewImage={setPreviewImage}
        previewImage={previewImage}
    />
}

export default connect(({ messages, user, dialogs }) => ({
    currentDialogId: dialogs.currentDialogId,
    items: messages.items,
    isLoading: messages.isLoading,
    user: user.data
}), messagesActions)(Messages);