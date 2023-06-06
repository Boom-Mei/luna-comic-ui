module.exports = {
    "plugins": {
        'autoprefixer': {
            browsers: 'last 5 version'
        },
        'postcss-pxtorem': {
            rootValue: 37.5,//设置html根元素默认计算参考值
            propList: ['*']
        }
    }
}