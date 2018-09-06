/**
 * Package ajax func by axios
 */

import axios from "axios";
import { local } from "./storage";
import { tools } from "./tools";

const instance = axios.create({ baseURL: process.env.VUE_APP_API, timeout: 0 })

instance.interceptors.request.use(
    conf => {
        return Object.assign(conf, {
            headers: {
                'Authentication': `Token ${local.get('_token')}`,
                'appid': process.env.VUE_APP_APPID
            }
        })
    },
    err => {
        console.log(err)
    }
)

instance.interceptors.response.use(
    res => {
        if (res.data.code === 200) {
            return Promise.resolve(res.data)
        } else if (res.data.code === 440403) {
            local.remove('_token')
            location.href = '/login?redirect=' + location.pathname
        } else {
            return Promise.reject(res.data)
        }
    },
    err => {
        console.log(err);
    }
)

const http = (methods = 'get', url, params) => methods.toUpperCase() === 'GET' ?
    instance[methods](url, { params: tools.packageParams(params) }) :
    instance[methods](url, tools.packageParams(params))


export default http