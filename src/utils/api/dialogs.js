import axios from '../../core/axios';

export default {
    getAll: () => axios.get('/dialogs'),
    create: ({ partner, text }) => axios.post('/dialogs', { partner, text })
}