import React, { useState } from 'react';
import BaseSidebar from '../components/Sidebar/Sidebar';
import { connect } from 'react-redux';
import { userApi, dialogsApi } from '../utils/api';

const Sidebar = ({ user }) => {
    const [visible, setVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messageText, setMessageText] = useState('');
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(false);

    const onClose = () => {
        setVisible(false);
    };

    const onShow = () => {
        setVisible(true);
    };

    const onSearch = (value) => {
        setIsLoading(true);
        userApi
            .findUsers(value)
            .then(({ data }) => {
                setUsers(data);
                setIsLoading(false);
            }).catch(() => {
                setIsLoading(false);
            });
    };

    const onAddDialog = () => {
        dialogsApi
            .create({
                partner: selectedUserId,
                text: messageText
            })
            .then(onClose)
            .catch(() => {
                setIsLoading(false);
            });
    };

    const handleChangeInput = value => {
        setInputValue(value);
    };

    const onChangeTextArea = e => {
        setMessageText(e.target.value);
    };

    const onSelectUser = userId => {
        setSelectedUserId(userId);
    };

    return (
        <BaseSidebar user={user}
            visible={visible}
            onSearch={onSearch}
            onClose={onClose}
            onShow={onShow}
            inputValue={inputValue}
            messageText={messageText}
            onChangeInput={handleChangeInput}
            onChangeTextArea={onChangeTextArea}
            users={users}
            onModalOk={onAddDialog}
            onSelectUser={onSelectUser}
            isLoading={isLoading}
            selectedUserId={selectedUserId}
        />
    )
}

export default connect(({ user }) => ({
    user: user.data
}))(Sidebar);