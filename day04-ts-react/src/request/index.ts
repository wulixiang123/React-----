import axios from 'axios'

const request = axios.create({
    baseURL:'https://api.github.com',
    timeout:2000
})
request.interceptors.response.use(respones=>respones.data)
export default request