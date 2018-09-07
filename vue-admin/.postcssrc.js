module.exports = {
    "plugins": {
        "autoprefixer": {},
        "postcss-px-to-viewport-opt": {
            "viewportWidth": 750,
            "viewportHeight": 1334,
            "unitPrecision": 3,
            "viewportUnit": "vw",
            "selectorBlackList": [
                ".ignore",
                ".hairlines",
                "#app",
                "body"
            ],
            "minPixelValue": 1,
            "mediaQuery": false,
            "exclude": /(\/|\\)(node_modules)(\/|\\)/
        },
        "postcss-viewport-units": {
            /* 过滤原本带有content属性的元素 */
            filterRule: (rule) => {
                return rule.selector.indexOf('::after') < 0 && rule.selector.indexOf(':after') < 0 && rule.selector.indexOf('::before') < 0 && rule.selector.indexOf(':before') < 0;
            }
        },
        "postcss-write-svg": {}
    }
}