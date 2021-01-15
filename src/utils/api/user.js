import axios from '../../core/axios';

export default {
    signin: (postData) => axios.post("/user/signin", postData),
    signup: (postData) => axios.post("/user/signup", postData),
    verifyHash: (hash) => axios.get("/user/verify?hash=" + hash),
    getMe: () => axios.get("/user/me"),
    findUsers: (query) => axios.get("/user/find?query=" + query),
}