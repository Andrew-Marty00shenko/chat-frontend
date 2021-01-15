import React, { useState, useRef, useEffect } from 'react';
import './Message.scss';
import Time from '../Time/Time';
import classNames from 'classnames';
import IconRead from '../IconRead/IconRead';
import waveSvg from '../../assets/img/wave.svg';
import playSvg from '../../assets/img/play.svg'
import pauseSvg from '../../assets/img/pause.svg';
import convertCurrentTime from '../../utils/helpers/convertCurrentTime';
import Avatar from '../Avatar/Avatar';
import { Popover, Button } from 'antd';
import { EllipsisOutlined, EyeOutlined } from '@ant-design/icons';
import reactStringReplace from 'react-string-replace';
import { Emoji } from "emoji-mart";

const MessageAudio = ({ audio }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioElem = useRef(null);

    useEffect(() => {
        audioElem.current.volume = "0.01";
        audioElem.current.addEventListener("playing", () => {
            setIsPlaying(true)
        }, false)
        audioElem.current.addEventListener("ended", () => {
            setIsPlaying(false);
            setProgress(0);
            setCurrentTime(0)
        }, false);
        audioElem.current.addEventListener("pause", () => {
            setIsPlaying(false)
        }, false);
        audioElem.current.addEventListener("timeupdate", () => {
            const duration = (audioElem.current && audioElem.current.duration) || 0;
            setCurrentTime(audioElem.current.currentTime);
            setProgress((audioElem.current.currentTime / duration) * 100);
        });
    }, [])

    const togglePlay = () => {
        if (!isPlaying) {
            audioElem.current.play();
        } else {
            audioElem.current.pause();
        }
    }

    return <div className="message__audio">
        <audio ref={audioElem} src={audio} preload="auto" />
        <div className="message__audio-progress" style={{ width: progress + "%" }} />
        <div className="message__audio-info">
            <div className="message__audio-btn">
                <button onClick={togglePlay}>
                    {isPlaying ? <img src={pauseSvg} alt="pause" />
                        :
                        <img src={playSvg} alt="play" />
                    }
                </button>
            </div>
            <div className="message__audio-wave">
                <img src={waveSvg} alt="wave svg" />
            </div>
            <span className="message__audio-duration">
                {convertCurrentTime(currentTime)}
            </span>
        </div>
    </div>
}

const Message = ({
    avatar,
    text,
    date,
    audio,
    user,
    isMe,
    readed,
    attachments,
    setPreviewImage,
    isTyping,
    onRemoveMessage,
}) => {
    return (
        <div className={classNames('message', {
            'message--isme': isMe,
            'message--is-typing': isTyping,
            'message--image': attachments && attachments.length === 1 && !text,
            "message--is-audio": false
        })}>
            <div className="message__content">
                <IconRead isMe={isMe} isReaded={readed} />
                <Popover
                    content={
                        <Button onClick={onRemoveMessage}>Удалить сообщение</Button>
                    }
                    trigger='click'
                >
                    <div className="message__icon-actions">
                        <Button type="link" shape="circle" icon={<EllipsisOutlined style={{ fontSize: '22px' }} />} />
                    </div>
                </Popover>
                <div className="message__avatar">
                    <Avatar user={user} />
                </div>
                <div className="message__info">
                    {text && <div className="message__bubble">
                        {text && <p className="message__text">{
                            reactStringReplace(text, /:(.+?):/g, (match, i) => (
                                <Emoji emoji={match} set='apple' size={20} />
                            ))}
                        </p>}
                        {
                            isTyping && <div className="message__typing">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        }
                        {
                            false && <MessageAudio audio={null} />
                        }
                    </div>}

                    {attachments && <div className="message__attachments">
                        {attachments.map((item, index) => (
                            <div
                                onClick={() => setPreviewImage(item.url)}
                                key={index}
                                className="message__attachments-item"
                            >
                                <div className="message__attachments-item-overlay">
                                    <EyeOutlined style={{ color: '#fff', fontSize: 18 }} />
                                </div>
                                <img src={item.url} alt={item.filename} />
                            </div>
                        ))}
                    </div>}

                    {date && <span className="message__date">
                        <Time date={date} />
                    </span>}
                </div>
            </div>
        </div>
    )
}



Message.defaultProps = {
    user: {}
}

export default Message;