import React from 'react';
import IconRead from '../IconRead/IconRead';
import classnames from 'classnames';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import Avatar from '../Avatar/Avatar';
import { Link } from 'react-router-dom';

const getMessageTime = (created_at) => {
    if (isToday(new Date(created_at))) {
        return format(new Date(created_at), "HH:mm")
    } else {
        return format(new Date(created_at), 'dd.MM.yyyy')
    }
}

const DialogItem = ({ _id, isMe, currentDialogId, lastMessage }) => {
    return (
        <Link to={`/dialog/${_id}`} >
            <div className={classnames("dialogs__item",
                {
                    "dialogs__item--online": lastMessage.user.isOnline,
                    "dialogs__item--selected": currentDialogId === _id
                })}
            >
                <div className="dialogs__item-avatar">
                    <Avatar user={lastMessage.user} />
                </div>
                <div className="dialogs__item-info">
                    <div className="dialogs__item-info-top">
                        <b>{lastMessage.user.fullname}</b>
                        <span>
                            {getMessageTime(lastMessage.createdAt)}
                        </span>
                    </div>
                    <div className="dialogs__item-info-bottom">
                        <p>
                            {lastMessage.text}
                        </p>
                        {isMe && <IconRead isMe={isMe} isReaded={lastMessage.readed} />}
                        {lastMessage.unread > 0 &&
                            <div div className="dialogs__item-info-bottom-count">
                                {lastMessage.unread > 99 ? '+99' : lastMessage.unread}
                            </div>
                        }

                    </div>
                </div>
            </div >
        </Link>
    )
}

export default DialogItem

