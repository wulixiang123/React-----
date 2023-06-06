import axios from 'axios'

const request = axios.create({
    baseURL:'https://api.github.com',
    timeout:20000
})
request.interceptors.response.use(response=>response.data);
export default request;