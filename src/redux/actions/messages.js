import { messagesApi } from '../../utils/api';

const actions = {
    setMessages: items => ({
        type: 'MESSAGES:SET_ITEMS',
        payload: items
    }),
    setIsLoading: bool => ({
        type: 'MESSAGES:SET_IS_LOADING',
        payload: bool
    }),
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