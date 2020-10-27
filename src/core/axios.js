import axios from 'axios';

axios.defaults.baseURL = "http://localhost:9999";
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-type'] = 'application/x-www-form-urlencoded';

export default axios;