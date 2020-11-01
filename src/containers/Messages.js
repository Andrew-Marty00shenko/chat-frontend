import React, { useEffect, useRef } from 'react';
import { messagesActions } from '../redux/actions';
import { connect } from 'react-redux';
import BaseMessages from '../components/Messages/Messages';

const Dialogs = ({ items, currentDialogId, fetchMessages, isLoading }) => {
    const messageRef = useRef(null);
    useEffect(() => {
        fetchMessages(currentDialogId);
    }, [fetchMessages, currentDialogId])

    useEffect(() => {
        messageRef.current.scrollTo(0, 999999)
    }, [items])

    return <BaseMessages messageRef={messageRef} items={items} isLoading={isLoading} />
}

export default connect(({ dialogs, messages }) => ({
    currentDialogId: dialogs.currentDialogId,
    items: messages.items,
    isLoading: messages.isLoading
})
    , messagesActions)(Dialogs);