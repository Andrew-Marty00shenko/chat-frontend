import { messagesApi } from '../../utils/api';

const actions = {
    setMessages: items => ({
        type: 'MESSAGES:SET_ITEMS',
        payload: items
    }),
    addMessage: message => (dispatch, getState) => {
        const { dialogs } = getState();
        const { currentDialogId } = dialogs;

        if (currentDialogId === message.dialog._id) {
            dispatch({
                type: 'MESSAGES:ADD_MESSAGE',
                payload: message
            });
        }
    },
    fetchSendMessage: (text, dialogId, attachments) => dispatch => {
        messagesApi.send(text, dialogId, attachments);
    },
    setIsLoading: bool => ({
        type: 'MESSAGES:SET_IS_LOADING',
        payload: bool
    }),
    removeMessagebyId: id => dispatch => {
        if (window.confirm('Вы действительно хотите удалить сообщение?')) {
            messagesApi
                .removeById(id)
                .then(({ data }) => {
                    dispatch(dispatch({
                        type: 'MESSAGES:REMOVE_MESSAGE',
                        payload: id
                    }));
                })
                .catch(() => {
                    dispatch(actions.setIsLoading(false));
                });
        }
    },
    fetchMessages: (dialogId) => {
        return dispatch => {
            dispatch(actions.setIsLoading(true));
            messagesApi
                .getAllByDialogsId(dialogId)
                .then(({ data }) => {
                    dispatch(actions.setMessages(data))
                })
                .catch(() => {
                    dispatch(actions.setIsLoading(false));
                })
        }
    }
}

export default actions;