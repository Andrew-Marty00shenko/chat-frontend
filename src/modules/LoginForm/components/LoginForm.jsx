import React from 'react'
import Button from '../../../components/Button/Button';
import { Form, Input } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import WhiteBlock from '../../../components/WhiteBlock/WhiteBlock';

import validateField from '../../../utils/helpers/validateField'

const LoginForm = ({
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
}) => {
    return (
        <div>
            <div className="auth__top">
                <h2>Войти в аккаунт</h2>
                <p>Пожалуйста, войдите в свой аккаунт</p>
            </div>
            <WhiteBlock>
                <Form
                    className="login-form"
                    handleSubmit={handleSubmit}
                >
                    <Form.Item help={!touched.email ? '' : errors.email}
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
                    <Form.Item>
                        <Button disabled={isSubmitting} onClick={handleSubmit} size="large" type="primary" htmlType="submit" className="login-form-button">
                            Войти в аккаунт
                            </Button>
                    </Form.Item>
                    <Link to="/signup" className="auth__register-link" > Зарегистрироваться</Link>
                </Form>
            </WhiteBlock>
        </div>
    )
}

export default LoginForm;

