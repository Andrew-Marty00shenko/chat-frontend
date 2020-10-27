import React from 'react';
import './Avatar.scss';
import generateAvatarFromHash from '../../utils/helpers/generateAvatarFromHash'

const Avatar = ({ user }) => {
    if (user.avatar) {
        return <img
            className="avatar"
            src={user.avatar}
            alt="ava" />;
    }
    else {
        const { color, colorLighten } = generateAvatarFromHash(user._id);
        const firstChar = user.fullname[0].toUpperCase();
        return <div
            style={{ background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%` }}
            className="avatar avatar--symbol">
            {firstChar}
        </div>
        // console.log(generateAvatarFromHash("5732f6b23c7d2cb118c0bfcccb48ed05"))
    }
}

export default Avatar;