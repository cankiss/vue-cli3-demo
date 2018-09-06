/**
 * Package some js tools
 */
const md5 = require('md5')

//接口加sign
class Tools {
    handleParams(params) {
        return Object.keys(params).sort()
            .filter(item => !!params[item] || params[item] === 0)
            .map(item => `${item}=${params[item]}`).join('&') + '&key=hbmm'
    }

    packageParams(params) {
        let timestamp = +new Date(),
            random = Math.random().toString(36).substr(2),
            _params = {
                timestamp,
                random,
                ...params
            };
        return {
            timestamp,
            random,
            sign: md5(this.handleParams(_params)).toUpperCase(),
            ...params
        }
    }
}

export const tools = new Tools()

//微信设置title
export const setDocumentTitle = title => {
    document.title = title;
    let ua = navigator.userAgent;
    if (/\bMicroMessenger\/([\d\.]+)/.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
        var i = document.createElement('iframe');
        i.src = '/static/favicon.ico';
        i.style.display = 'none';
        i.onload = function() {
            setTimeout(function() {
                i.remove();
            }, 9);
        };
        document.body.appendChild(i);
    }
};

// vue directive for dialog overflow
export const wxOverflow = {
    install: Vue => {
        Vue.directive('overflow', {
            bind: function(el) {
                document.querySelectorAll('html,body').forEach(item => {
                    el.setAttribute(`data-${item.nodeName.toLowerCase()}`, item.getAttribute('style'))
                    item.setAttribute('style', 'overflow-y:hidden;' + (item.getAttribute('style') || ''))
                })
            },
            unbind: function(el) {
                let params = el.dataset
                document.querySelectorAll('html,body').forEach(item => {
                    item.removeAttribute('style')
                })
                Object.keys(params).filter(k => (!!params[k] && params[k] !== "null") && k).forEach(item => {
                    document.querySelector(item).setAttribute('style', params[item])
                })
            }
        })
    }
}

export const jumper = url => { location.href = location.origin + url }