import React, { useEffect } from 'react';
import { messagesActions } from '../redux/actions';
import { connect } from 'react-redux';
import BaseMessages from '../components/Messages/Messages';

const Dialogs = ({ items, currentDialogId, fetchMessages }) => {
    useEffect(() => {
        fetchMessages(currentDialogId);
    }, [fetchMessages, currentDialogId])

    return <BaseMessages items={items} />
}

export default connect(({ dialogs, messages }) => ({
    currentDialogId: dialogs.currentDialogId,
    items: messages.items
})
    , messagesActions)(Dialogs);