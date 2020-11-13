import { notification } from 'antd';

export default ({ type = 'info', title, text, duration = 3 }) =>
    notification[type]({
        message: title,
        description: text,
        duration: duration
    });