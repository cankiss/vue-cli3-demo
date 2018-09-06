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
        "postcss-write-svg": {}
    }
}