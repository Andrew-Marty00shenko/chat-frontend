import React, { useEffect, useRef } from 'react';
import { messagesActions } from '../redux/actions';
import { connect } from 'react-redux';
import BaseMessages from '../components/Messages/Messages';
import socket from '../core/socket';

const Dialogs = ({ items, currentDialogId, addMessage, fetchMessages, isLoading, user }) => {
    const messageRef = useRef(null);

    const onNewMessage = (data) => {
        addMessage(data);
    };

    useEffect(() => {
        fetchMessages(currentDialogId);
        socket.on('SERVER:NEW_MESSAGE', onNewMessage);

        return () => {
            socket.removeListener('SERVER:NEW_MESSAGE', onNewMessage)
        }
    }, [currentDialogId, fetchMessages]);

    useEffect(() => {
        messageRef.current.scrollTo(0, 999999)
    }, [items]);



    return <BaseMessages user={user} messageRef={messageRef} items={items} isLoading={isLoading} />
}

export default connect(({ dialogs, messages, user }) => ({
    currentDialogId: dialogs.currentDialogId,
    items: messages.items,
    isLoading: messages.isLoading,
    user: user.data
}), messagesActions)(Dialogs);