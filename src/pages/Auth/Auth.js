import React from 'react'
import LoginForm from '../../modules/LoginForm/containers/LoginForm';
import './Auth.scss';
import { Route } from 'react-router-dom';
import RegisterForm from '../../modules/RegisterForm/containers/RegisterForm';
import CheckEmailInfo from './components/CheckEmailInfo';

const Auth = () => {

    return (
        <section className="auth">
            <div className="auth__content">
                <Route exact path="/signin" component={LoginForm} />
                <Route exact path="/signup" component={RegisterForm} />
                <Route exact path="/signup/verify" component={CheckEmailInfo} />
            </div>
        </section>
    )
}

export default Auth
