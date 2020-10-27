import React from 'react'
import Button from '../../../components/Button/Button';
import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import WhiteBlock from '../../../components/WhiteBlock/WhiteBlock';
import validateField from '../../../utils/helpers/validateField'

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
    const success = true
    return (
        <div>
            <div className="auth__top">
                <h2>Регистрация</h2>
                <p>Для входа вам нужно зарегистрироваться</p>
            </div>
            <WhiteBlock>
                {success ?
                    <Form
                        className="login-form"
                        handleSubmit={handleSubmit}
                    >
                        <Form.Item help={touched.email ? errors.email : ''}
                            validateStatus={validateField('email', touched, errors)}
                        >
                            <Input
                                size="large"
                                id="email"
                                prefix={<MailOutlined className="site-form-item-icon" />}
                                value={values.email}
                                placeholder="E-mail"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                type="user"
                                placeholder="Ваше имя"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item validateStatus={validateField('password', touched, errors)}
                            help={!touched.password ? '' : errors.password}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Пароль"
                                id="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item validateStatus={validateField('password2', touched, errors)}>
                            <Input
                                id="password2"
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password2"
                                placeholder="Повторите пароль"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={handleSubmit} size="large" type="primary" htmlType="submit" className="login-form-button">
                                Зарегистрироваться
                            </Button>
                        </Form.Item>
                        <Link to="/login" className="auth__register-link" > Войти в аккаунт</Link>
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
