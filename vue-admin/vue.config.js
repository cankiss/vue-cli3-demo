const path = require('path')

module.exports = {
    baseUrl: '/',

    configureWebpack: config => {
        config.resolve.alias = Object.assign(config.resolve.alias, {
            'assets': path.resolve(__dirname, './src/assets')
        })
    },

    devServer: {
        open: true,
        port: 9000
    },

    productionSourceMap: false,

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, './src/assets/css/variable.less')
            ]
        }
    }
}