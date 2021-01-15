import React, { useState } from 'react';
import BaseChatInput from '../components/ChatInput/ChatInput';
import { connect } from 'react-redux';
import { messagesActions } from '../redux/actions';
import { filesApi } from '../utils/api';

const ChatInput = ({ fetchSendMessage, currentDialogId }) => {
    const [value, setValue] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [emojiPickerVisible, setShowEmojiPicker] = useState(false);
    const [isRecording, setIsRecording] = useState(false);

    if (!currentDialogId) {
        return null;
    };

    window.navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia ||
        navigator.webkitGetUserMedia;

    const onRecord = () => {
        if (navigator.getUserMedia) {
            navigator.getUserMedia({ audio: true }, onRecording, onError);
        }
    };

    const onRecording = (stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        recorder.start();

        recorder.onstart = () => {
            setIsRecording(true);
        }

        recorder.onstop = () => {
            setIsRecording(false);
        }

        recorder.ondataavailable = (e) => {
            let audioURL = window.url.createObjectUrl(e.data);
            new Audio(audioURL).play();
        }
    }

    const onError = (err) => {
        console.log(err);
    };

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!emojiPickerVisible);
    };

    const addEmoji = ({ colons }) => {
        setValue((value + ' ' + colons).trim());
    };

    const sendMessage = () => {
        fetchSendMessage(value, currentDialogId, attachments.map(file => file.uid));
        setValue('');
        setAttachments([]);
    };

    const handleSendMessage = e => {
        if (e.keyCode === 13) {
            sendMessage();
        }
    };

    const onSelectFiles = async files => {
        let uploaded = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const uid = Math.round(Math.random() * 1000);
            uploaded = [
                ...uploaded,
                {
                    uid,
                    name: file.name,
                    status: 'uploading',
                },
            ];
            setAttachments(uploaded);
            // eslint-disable-next-line no-loop-func
            await filesApi.upload(file).then(({ data }) => {
                uploaded = uploaded.map(item => {
                    if (item.uid === uid) {
                        return {
                            status: 'done',
                            uid: data.file._id,
                            name: data.file.filename,
                            url: data.file.url,
                        };
                    }
                    return item;
                });
            });
        }
        setAttachments(uploaded);
    };

    const onStopRecording = () => {
        mediaRecorder.stop();
    };

    return (
        <BaseChatInput
            handleSendMessage={handleSendMessage}
            value={value}
            addEmoji={addEmoji}
            setValue={setValue}
            emojiPickerVisible={emojiPickerVisible}
            setShowEmojiPicker={setShowEmojiPicker}
            toggleEmojiPicker={toggleEmojiPicker}
            sendMessage={sendMessage}
            attachments={attachments}
            onSelectFiles={onSelectFiles}
            isRecording={isRecording}
            onRecord={onRecord}
            onStopRecording={onStopRecording}
        />
    )
}

export default connect(
    ({ dialogs }) => dialogs,
    messagesActions)
    (ChatInput);