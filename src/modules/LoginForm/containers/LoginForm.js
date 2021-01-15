import LoginForm from '../components/LoginForm';
import { withFormik } from 'formik';
import validateFunc from '../../../utils/validate';
import userActions from '../../../redux/actions/user';
import store from '../../../redux/store';

const LoginFormContainer = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),
    validate: values => {
        let errors = {};
        validateFunc({ isAuth: true, errors, values })
        return errors;
    },
    handleSubmit: (values, { setSubmitting, props }) => {
        store.dispatch(userActions.fetchUserLogin(values))
            .then(({ status }) => {
                if (status === 'success') {
                    props.history.push('/');
                }
                setSubmitting(false);
            }).catch(() => {
                setSubmitting(false);
            })
    },
    displayName: 'LoginForm',
})(LoginForm);


export default LoginFormContainer;