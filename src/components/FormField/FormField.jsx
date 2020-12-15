import React from 'react'
import { Form, Input } from 'antd';
import validateField from '../../utils/helpers/validateField'

const FormField = ({ touched, errors, type, values, name, placeholder, icon, handleChange, handleBlur }) => {
    return (
        <div>
            <Form.Item help={!touched[name] ? '' : errors[name]}
                validateStatus={validateField(name, touched, errors)}
            >
                <Input
                    size="large"
                    id={name}
                    prefix={icon}
                    value={values[name]}
                    placeholder={placeholder}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type={type}
                />
            </Form.Item>
        </div >
    )
}

export default FormField;
