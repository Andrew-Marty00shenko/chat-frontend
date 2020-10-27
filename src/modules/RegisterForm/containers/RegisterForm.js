import RegisterForm from '../components/RegisterForm';
import { withFormik } from 'formik';
import validateFunc from '../../../utils/validate'

export default withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: '',
        fullname: '',
        password2: ''
    }),
    validate: values => {
        let errors = {};
        validateFunc({ isAuth: true, errors, values })
        return errors
    },
    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    },

    displayName: 'RegisterForm',
})(RegisterForm);
