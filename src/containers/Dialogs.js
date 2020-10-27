import React, { useState, useEffect } from 'react';
import BaseDialogs from '../components/Dialogs/Dialogs';
import { dialogsActions } from '../redux/actions';
import { connect } from 'react-redux';

const Dialogs = ({ fetchDialogs, items, userId, setCurrentDialogId }) => {
    const [inputValue, setValue] = useState('');
    const [filtred, setFiltredItems] = useState(Array.from(items));

    const onChangeInput = value => {
        setFiltredItems(
            items.filter(dialog => dialog.user.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0)
        );
        setValue(value);
    };

    useEffect(() => {
        if (!items.length) {
            fetchDialogs();
        } else {
            setFiltredItems(items)
        }
    }, [items.length, fetchDialogs, items])

    return <BaseDialogs
        userId={userId}
        items={filtred}
        onSearch={onChangeInput}
        onSelectDialog={setCurrentDialogId}
        inputValue={inputValue} />
}

export default connect(({ dialogs }) => dialogs, dialogsActions)(Dialogs);