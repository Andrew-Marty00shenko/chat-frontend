import axios from '../../core/axios';

export default {
    getAllByDialogsId: (id) => axios.get("/messages?dialog=" + id)
}