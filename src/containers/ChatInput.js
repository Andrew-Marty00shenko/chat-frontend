import React from 'react';
import BaseChatInput from '../components/ChatInput/ChatInput';
import { connect } from 'react-redux';
import { messagesActions } from '../redux/actions';

const ChatInput = ({ fetchSendMessage, currentDialogId }) => {
    return (
        <BaseChatInput onSendMessage={fetchSendMessage} currentDialogId={currentDialogId} />
    )
}

export default connect(
    ({ dialogs }) => dialogs,
    messagesActions)
    (ChatInput);