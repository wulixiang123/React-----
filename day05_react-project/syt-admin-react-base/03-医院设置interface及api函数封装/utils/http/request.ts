import axios from "axios";
import { message } from "antd";
import { store } from "@/app/store";

// interface ResponseData<T> {
//   code: number;
//   data: T;
//   message: string;
// }

// 创建一个新的axios，就是返回值request
// request的用法和axios用法基本一致
const request = axios.create({
  // 公共配置，将来发送请求会自动添加
  // 发送请求的前缀：将来所有通过request发送的请求，会在请求地址前面自动添加baseURL
  // react脚手架会根据开发/生产自动加载.env.xxx的环境变量
  // 通过 process.env.xxx 读取加载的环境变量的值
  // 开发模式下：process.env.REACT_APP_API --> /dev-api
  baseURL: process.env.REACT_APP_API, // 请求地址：baseURL + url
  timeout: 10000, // 请求超时时间：一旦请求超过10s还未完成，就会自动中断请求
  // headers: {},
});

// 请求拦截器函数：发送请求之前触发的函数
request.interceptors.request.use((config) => {
  // token从redux中读取
  // 不是组件，不能使用hooks函数读取
  // 使用最原始读取redux数据的方法
  const token = store.getState().user.token;

  if (token) {
    // 携带token参数
    (config.headers as any).token = token;
  }

  return config;
});

// 响应拦截器函数：得到响应之后触发的函数
request.interceptors.response.use(
  (response) => {
    // 请求成功
    if (response.data.code === 200) {
      // 说明功能成功，返回成功的数据
      return response.data.data; // 我们最终希望得到的数据
    } else {
      // 说明功能失败，没有数据，返回失败的原因
      const errorMsg = response.data.data || response.data.message
      message.error(errorMsg);
      return Promise.reject(errorMsg); // 外面触发失败的流程
    }
  },
  (error) => {
    // 请求失败
    message.error(error);
    return Promise.reject(error);
  }
);

export default request;
