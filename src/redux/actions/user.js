import { userApi } from '../../utils/api';
import openNotification from '../../utils/helpers/openNotification';

const actions = {
    setUserData: data => ({
        type: 'USER:SET_DATA',
        payload: data
    }),
    setIsAuth: bool => ({
        type: 'USER:SET_IS_AUTH',
        payload: bool,
    }),
    fetchUserData: () => dispatch => {
        userApi.getMe().then(({ data }) => {
            dispatch(actions.setUserData(data));
        }).catch(err => {
            if (err.response.status === 403) {
                dispatch(actions.setIsAuth(false));
                delete window.localStorage.token;
            }
        });
    },
    fetchUserLogin: postData => dispatch => {
        return userApi.signin(postData).then(({ data }) => {
            const { token } = data;
            openNotification({
                title: 'Отлично!',
                text: 'Авторизация успешна.',
                type: 'success'
            });
            window.axios.defaults.headers.common['token'] = token;
            window.localStorage['token'] = token;
            dispatch(actions.fetchUserData());
            dispatch(actions.setIsAuth(true));
            return data;
        }).catch(({ response }) => {
            if (response.status === 403) {
                openNotification({
                    title: 'Ошибка при авторизации',
                    text: 'Неверный логин или пароль',
                    type: 'error'
                });
            }
        });
    },
    fetchUserRegister: postData => dispatch => {
        return userApi.signup(postData).then(({ data }) => {
            return data;
        });
    }
};

export default actions;