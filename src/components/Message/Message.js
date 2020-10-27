import React, { useState, useRef, useEffect } from 'react';
import './Message.scss';
import Time from '../Time/Time';
import classNames from 'classnames';
import IconRead from '../IconRead/IconRead';
import waveSvg from '../../assets/img/wave.svg';
import playSvg from '../../assets/img/play.svg'
import pauseSvg from '../../assets/img/pause.svg';
import convertCurrentTime from '../../utils/helpers/convertCurrentTime'

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

const Message = ({ avatar, text, date, audio, user, isMe, isReaded, attachments, isTyping }) => {

    return (
        <div className={classNames('message', {
            'message--isme': isMe,
            'message--is-typing': isTyping,
            'message--image': attachments && attachments.length === 1,
            "message--is-audio": audio
        })}>
            <div className="message__content">
                <IconRead isMe={isMe} isReaded={isReaded} />
                <div className="message__avatar">
                    <img src={avatar} alt={`Avatar ${user.fullName}`} />
                </div>
                <div className="message__info">
                    {(audio || text || isTyping) && <div className="message__bubble">
                        {text && <p className="message__text">{text}  </p>}
                        {
                            isTyping && <div className="message__typing">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        }
                        {
                            audio && <MessageAudio audio={audio} />
                        }
                    </div>}

                    {attachments && <div className="message__attachments">
                        {attachments.map((item, index) => (
                            <div key={index} className="message__attachments-item">
                                <img src={item.url} alt={item.filename} />
                            </div>
                        ))}
                    </div>
                    }

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