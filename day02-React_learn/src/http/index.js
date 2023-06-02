import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const instance = axios.create({
    baseURL:'http://api.github.com',
    timeout:2000
})

instance.interceptors.request.use(config=>{
    NProgress.start()
    return config
})

instance.interceptors.response.use(response=>{
    NProgress.done()
    return response.data
},error=>{
    NProgress.done()
    console.log('出错了');
    return new Promise(()=>{})
})

export default instance