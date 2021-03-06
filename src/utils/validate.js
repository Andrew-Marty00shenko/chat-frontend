export default ({ isAuth, values, errors }) => {
    const rules = {
        email: (value) => {
            if (!value) {
                errors.email = 'Введите E-mail';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                errors.email = 'Неверный E-mail';
            }
        },
        password: (value) => {
            if (!value) {
                errors.password = 'Введите пароль';
            } else if (!isAuth && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i.test(value)) {
                errors.password = 'Слишком легкий пароль'
            }
        },
        password_2: (value) => {
            if (value !== values.password) {
                errors.password_2 = 'Пароли не совпадают';
            }
        },
        fullname: (value) => {
            if (!value) {
                errors.fullname = 'Укажите своё имя и фамилию';
            }
        },
    }

    Object.keys(values).forEach(
        key => rules[key] && rules[key](values[key])
    );
}