import React from 'react'
import Button from '../../../components/Button/Button';
import { Form } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import WhiteBlock from '../../../components/WhiteBlock/WhiteBlock';
import FormField from '../../../components/FormField/FormField';


const RegisterForm = ({
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting
}) => {
    const success = false
    return (
        <div>
            <div className="auth__top">
                <h2>Регистрация</h2>
                <p>Для входа вам нужно зарегистрироваться</p>
            </div>
            <WhiteBlock>
                {!success ?
                    <Form
                        className="login-form"
                        handleSubmit={handleSubmit}
                    >
                        <FormField
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            touched={touched}
                            errors={errors}
                            placeholder="E-Mail"
                            name="email"
                            icon={<MailOutlined className="site-form-item-icon" />}
                            values={values}
                        />

                        <FormField
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            touched={touched}
                            errors={errors}
                            placeholder="Ваше имя и фамилия"
                            name="fullname"
                            icon={<UserOutlined className="site-form-item-icon" />}
                            values={values}
                        />

                        <FormField
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            touched={touched}
                            errors={errors}
                            type="password"
                            placeholder="Пароль"
                            name="password"
                            icon={<LockOutlined className="site-form-item-icon" />}
                            values={values}
                        />

                        <FormField
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            touched={touched}
                            errors={errors}
                            type="password"
                            placeholder="Повторите пароль"
                            name="password_2"
                            icon={<LockOutlined className="site-form-item-icon" />}
                            values={values}
                        />

                        <Form.Item>
                            <Button disabled={isSubmitting} onClick={handleSubmit} size="large" type="primary" htmlType="submit" className="login-form-button">
                                Зарегистрироваться
                            </Button>
                        </Form.Item>
                        <Link to="/signin" className="auth__register-link" > Войти в аккаунт</Link>
                    </Form> : <div className="auth__success-block">
                        <InfoCircleOutlined type="info-circle" style={{ fontSize: '48px', color: '#08c' }} theme="twoTone" />
                        <h2>Подтвердите свой аккаунт</h2>
                        <p>
                            На вашу почту отправлено письмо с ссылкой на подтверждение аккаунта
                    </p>
                    </div>}
            </WhiteBlock>
        </div >
    )
}

export default RegisterForm;
