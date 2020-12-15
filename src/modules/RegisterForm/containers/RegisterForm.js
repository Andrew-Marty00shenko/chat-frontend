import RegisterForm from '../components/RegisterForm';
import { withFormik } from 'formik';
import validateFunc from '../../../utils/validate';
import userActions from '../../../redux/actions/user';
import store from '../../../redux/store'

export default withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: '',
        fullname: '',
        password_2: ''
    }),
    validate: values => {
        let errors = {};
        validateFunc({ isAuth: true, errors, values })
        return errors
    },
    handleSubmit: (values, { setSubmitting, props }) => {
        store.dispatch(userActions.fetchUserRegister(values))
            .then(({ status }) => {
                if (status === 'success') {
                    setTimeout(() => props.history.push('/'), 500);
                }
                setSubmitting(false);
            }).catch(() => {
                setSubmitting(false);
            })
    },

    displayName: 'RegisterForm',
})(RegisterForm);
