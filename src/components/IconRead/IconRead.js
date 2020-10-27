import React from 'react';
import readedSvg from '../../assets/img/readed.svg';
import noreadedSvg from '../../assets/img/noreaded.svg';

const IconRead = ({ isMe, isReaded }) => {
    return <>
        {isMe &&
            (isReaded ? (
                < img className="message__icon-readed"
                    src={readedSvg}
                    alt="checked__icon"
                />
            ) : (
                    < img className="message__icon-readed"
                        src={noreadedSvg}
                        alt="readed"
                    />
                ))}
    </>
}

export default IconRead