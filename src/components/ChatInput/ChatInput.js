import React, { useState } from 'react';
import './ChatInput.scss';
import { Input, Button } from 'antd';
import { SmileOutlined, CameraOutlined, AudioOutlined, SendOutlined } from '@ant-design/icons';
import { UploadField } from "@navjobs/upload";
import { Picker } from "emoji-mart";

const ChatInput = (props) => {
    const [value, setValue] = useState("");
    const [emojiPickerVisible, setShowEmojiPicker] = useState(false);

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!emojiPickerVisible);
    }

    return <div className="chat-input">
        <div className="chat-input__smile-btn">
            {emojiPickerVisible && (
                <div className="chat-input__emoji-picker">
                    <Picker set='apple' />
                </div>
            )}
            <Button onClick={toggleEmojiPicker} type="link" shape="circle" icon={<SmileOutlined />} />
        </div>
        <Input
            onChange={e => setValue(e.target.value)}
            size="large"
            placeholder="Введите текст сообщения..."
        />
        <div className="chat-input__actions">
            <UploadField
                onFiles={(files) => console.log(files)}
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
            {value ?
                <Button type="link" shape="circle" icon={<SendOutlined />} />
                :
                <Button type="link" shape="circle" icon={<AudioOutlined />} />}
        </div>
    </div>
}

export default ChatInput;