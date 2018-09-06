/**
 * All wechat js api
 */

import { session } from './storage'
import { Toast } from 'mint-ui';


export const wxCloseWindow = params => new Promise((resolve, reject) => {
    wx.config({
        debug: false,
        appId: params.appId,
        timestamp: params.timestamp,
        nonceStr: params.noncestr,
        signature: params.signature,
        jsApiList: ['closeWindow', 'hideMenuItems']
    })

    wx.ready(function() {
        wx.hideMenuItems({
            menuList: [
                'menuItem:share:qq',
                'menuItem:share:weiboApp',
                'menuItem:share:QZone',
                'menuItem:share:appMessage',
                'menuItem:share:timeline',
                "menuItem:copyUrl"
            ]
        });
        resolve()
    })
})


export const wxShare = (params, shareParams = {
    title: "",
    desc: "",
    link: "",
    imgUrl: "",
    jsApiList: ""
}, callback) => {
    wx.config({
        debug: false,
        appId: params.appId,
        timestamp: params.timestamp,
        nonceStr: params.noncestr,
        signature: params.signature,
        jsApiList: shareParams.jsApiList || ['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems', 'closeWindow']
    })
    wx.ready(function() {
        //分享给朋友圈
        wx.onMenuShareTimeline({
            title: shareParams.title,
            desc: shareParams.desc,
            link: shareParams.link || "",
            imgUrl: shareParams.imgUrl,
            success: function() {
                Toast('分享成功')
                session.set('_ios11_bug', '1')
                typeof callback === 'function' && callback()
            }
        });
        //分享给微信
        wx.onMenuShareAppMessage({
            title: shareParams.title,
            desc: shareParams.desc,
            link: shareParams.link || "",
            imgUrl: shareParams.imgUrl,
            success: function() {
                Toast('分享成功')
                typeof callback === 'function' && callback()
            }
        });
        // 隐藏分享渠道 只保留朋友圈
        wx.hideMenuItems({
            menuList: [
                'menuItem:share:qq',
                'menuItem:share:weiboApp',
                'menuItem:share:QZone',
                'menuItem:share:appMessage'
            ]
        });
    });
};

export const callWxPay = data => new Promise((resolve, reject) => {
    wx.chooseWXPay({
        timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
        package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: data.paySign, // 支付签名
        success: function() { //付款成功回调
            resolve()
        },
        cancel: function(res) {
            Toast("您取消了支付")
            reject(res)
        },
        error: function() {
            Toast('支付失败')
            reject(res)
        }
    })
})