import axios from '../../core/axios';

export default {
    getAllByDialogsId: (id) => axios.get("/messages?dialog=" + id),
    removeById: (id) => axios.delete("/messages?id=" + id),
    send: (text, dialogId, attachments) => axios.post('/messages', {
        text: text,
        dialog_id: dialogId,
        attachments
    })
}