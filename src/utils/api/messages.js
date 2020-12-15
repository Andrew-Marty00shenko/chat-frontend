import axios from '../../core/axios';

export default {
    getAllByDialogsId: (id) => axios.get("/messages?dialog=" + id),
    send: (text, dialogId) => axios.post('/messages', {
        text: text,
        dialog_id: dialogId
    })
}