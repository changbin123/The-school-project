import axios from "axios";
import qs from "qs";
axios.defaults.baseURL = "http://127.0.0.1:5000";

import local from "@/utils/local.js";
import router from "@/router"
import {
    Message
} from "element-ui";
//请求拦截器
axios.interceptors.request.use(
    config => {
        console.log("请求拦截器")
        // 为请求头添加Authorization字段为服务端返回的token
        config.headers.Authorization = local.get('tk');
        return config
    },
    err => {
        console.log("请求error")
        return Promise.reject(err)
    })

// 响应拦截器
axios.interceptors.response.use(
    response => {
        //拦截响应，做统一处理 
        const {
            code,
            msg
        } = response.data;
        if (code !== undefined && msg !== undefined) {
            switch (code){
                case "0":
                    Message.success(msg);
                    break;
                case 0:
                    Message.success(msg);
                    break;
                case 1:
                    Message.error(msg);
                    break;    
                case "1":
                    Message.error(msg);
                    break; 
            }
        }
        return response
    },
    //接口错误状态处理，也就是说无响应时的处理，或没有登录令牌时拦截跳转到登录
    // err => {
    //     if(err.response.data.code=="401"){
    //         Message.error(err.response.data.msg)
    //         router.push("/login")
    //     }
    //     return Promise.reject(err.response.status) // 返回接口返回的错误信息
    // })
    error => {
        console.log("响应error")
        //如果token无效 就跳转到登录页面
        if(error.response.status==401){
            Message.error(error.response.data.msg);
            router.push("/login")
        }
        return Promise.reject(error.response.status) // 返回接口返回的错误信息
    })


const get = (url, data) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: data
        }).then((response) => {
            resolve(response.data)
        }).catch((err) => {
            reject(err)
        })
    })
}
const post = (url, data) => {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(data)).then((response) => {
            resolve(response.data)
        }).catch((err) => {
            reject(err)
        })
    })
}

export default {
    get,
    post
}