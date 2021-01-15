import React, { useRef } from 'react';
import './ChatInput.scss';
import { Input, Button } from 'antd';
import { SmileOutlined, CameraOutlined, AudioOutlined, SendOutlined, CloseOutlined } from '@ant-design/icons';
import { UploadField } from "@navjobs/upload";
import { Picker } from "emoji-mart";
import UploadFiles from '../UploadFiles/UploadFiles';
import useOutside from '../../utils/helpers/useOutside';

const { TextArea } = Input;

const ChatInput = ({
    value,
    setValue,
    emojiPickerVisible,
    addEmoji,
    toggleEmojiPicker,
    handleSendMessage,
    setShowEmojiPicker,
    sendMessage,
    onSelectFiles,
    attachments,
    onRecord,
    onStopRecording,
    isRecording
}) => {
    const ref = useRef();

    useOutside(ref, () => {
        setShowEmojiPicker(false);
    });

    return <>
        <div className="chat-input">
            <div>
                <div ref={ref} className="chat-input__smile-btn">
                    <div className="chat-input__emoji-picker">
                        {emojiPickerVisible && (
                            <Picker onSelect={(emojiTag) => addEmoji(emojiTag)} set='apple' />
                        )}
                    </div>
                    <Button
                        onClick={toggleEmojiPicker}
                        type="link"
                        shape="circle"
                        icon={<SmileOutlined />}
                    />
                </div>
                {
                    isRecording ?
                        <div className="chat-input__record-status">
                            <i></i>
                             Recording...
                             <Button
                                onClick={onStopRecording}
                                type="link"
                                shape="circle"
                                icon={<CloseOutlined />}
                                className="stop-recording"
                            />
                        </div>
                        :
                        <TextArea
                            onChange={e => setValue(e.target.value)}
                            value={value}
                            onKeyUp={handleSendMessage}
                            autoSize={{ minRows: 1, maxRows: 6 }}
                            size="large"
                            placeholder="Введите текст сообщения..."
                        />
                }

                <div className="chat-input__actions">
                    <UploadField
                        onFiles={onSelectFiles}
                        containerProps={{
                            className: "chat-input__actions-upload-btn"
                        }}
                        uploadProps={{
                            accept: ".jpg,.jpeg,.png,.gif,.bmp",
                            multiple: "multiple"
                        }}
                    >
                        <Button type="link" shape="circle" icon={<CameraOutlined />} />
                    </UploadField>
                    {isRecording || value || attachments.length ?
                        <Button
                            onClick={sendMessage}
                            type="link"
                            shape="circle"
                            icon={<SendOutlined />}
                        />
                        :
                        <div className="chat-input__record-btn">
                            <Button
                                onClick={onRecord}
                                type="link"
                                shape="circle"
                                icon={<AudioOutlined />}
                            />
                        </div>
                    }

                </div>
            </div>
            <div className="chat-input__attachments">
                <UploadFiles attachments={attachments} />
            </div>
        </div >
    </>
}

export default ChatInput;