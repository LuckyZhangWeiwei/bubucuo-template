/**
 * @description axios拦截器
 */

import { message } from 'antd';
import axios from 'axios';
import { hideLoading, showLoading } from 'src/store/globalStore/globalStore';

// 创建Axios
const Axios = axios.create({
    timeout: 20000,
})
// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (config.headers.globalLoading !== false) {
        showLoading()
    }
    return config;
}, function (error) {
    if (error.config.headers.globalLoading !== false) {
        hideLoading()
    }
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.config.headers.globalLoading !== false) {
        hideLoading();
    }
    if (response.status === 200) {
        let code = response.data.code;
        if (code === 200) {
            return response.data.result;
        } else if (code === 401) {
            message.info("请先登录！");
        } else {
            message.warning(response.data.msg || "信息有误，失败！");
        }
    } else {
        message.warning(response.data.msg || "信息有误，失败！");
    }
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if(error.config.headers.globalLoading !== false) {
        hideLoading();
    }
    return Promise.reject(error);
});

export default Axios;