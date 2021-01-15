import React, { useState, useEffect } from 'react';
import BaseDialogs from '../components/Dialogs/Dialogs';
import { dialogsActions } from '../redux/actions';
import { connect } from 'react-redux';
import socket from '../core/socket';

const Dialogs = ({ fetchDialogs, items, userId, currentDialogId }) => {
    const [inputValue, setValue] = useState('');
    const [filtred, setFiltredItems] = useState(Array.from(items));

    const onChangeInput = (value = "") => {
        setFiltredItems(
            items.filter(
                dialog =>
                    dialog.author.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0 ||
                    dialog.partner.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0
            )
        );
        setValue(value);
    };

    useEffect(() => {
        if (items.length) {
            onChangeInput();
        }
    }, [items]);

    useEffect(() => {
        fetchDialogs();

        socket.on('SERVER:DIALOG_CREATED', fetchDialogs);
        socket.on('SERVER:NEW_MESSAGE', fetchDialogs);
        return () => {
            socket.removeListener('SERVER:DIALOG_CREATED', fetchDialogs)
            socket.removeListener('SERVER:NEW_MESSAGE', fetchDialogs)
        }
    }, [fetchDialogs]);

    return <BaseDialogs
        userId={userId}
        currentDialogId={currentDialogId}
        items={filtred}
        onSearch={onChangeInput}
        inputValue={inputValue} />
}

export default connect(({ dialogs }) => dialogs, dialogsActions)(Dialogs);