/**
 * All interface
 */

import http from "./ajax";

//微信登录
export const weChatLogin = code => http('post', '/api/user/login', { code })

//获取用户信息
export const getUserInfoAndQrcode = () => http('get', '/api/getQrcodeAndUserInfo')

//wechat jssdk config
export const wechatConfig = (url = location.href.split('#')[0], appId = process.env.VUE_APP_APPID) => http('post', '/wechat/jsSignature', {
    url,
    appId
})

//打卡分享回调
export const signInRecord = () => http('post', '/api/attendance')

//获取我的页面信息

export const myPageMsg = () => http('get', '/api/my')

//乐于分享接口
export const posterShare = () => http('get', '/api/poster')