import React from 'react';
import IconRead from '../IconRead/IconRead';
import classnames from 'classnames';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import Avatar from '../Avatar/Avatar';


const getMessageTime = created_at => {
    if (isToday(new Date(created_at))) {
        return format(new Date(created_at), "HH:mm")
    } else {
        return format(new Date(created_at), 'dd.MM.yyyy')
    }
}

const DialogItem = ({ _id, user, unread, isMe, created_at, text, onSelect, currentDialogId }) => {
    return (
        <div className={classnames("dialogs__item",
            {
                "dialogs__item--online": user.isOnline,
                "dialogs__item--selected": currentDialogId === _id
            })}
            onClick={onSelect.bind(this, _id)}
        >
            <div className="dialogs__item-avatar">
                {/* <img src={user.avatar} alt={`${user.fullname} avatar`} /> */}
                <Avatar user={user} />
            </div>
            <div className="dialogs__item-info">
                <div className="dialogs__item-info-top">
                    <b>{user.fullname}</b>
                    <span>
                        {getMessageTime(created_at)}
                    </span>
                </div>
                <div className="dialogs__item-info-bottom">
                    <p>
                        {text}
                    </p>
                    {isMe && <IconRead isMe={true} isReaded={false} />}
                    {unread > 0 &&
                        <div div className="dialogs__item-info-bottom-count">
                            {unread > 99 ? '+99' : unread}
                        </div>
                    }

                </div>
            </div>
        </div >
    )
}

export default DialogItem

