const loaderFiles = require('./loader.js')

const data = loaderFiles

module.exports = [
    {
        url: '/w',
        type: 'get',
        response: config => {
            const { word } = config.query
            return {
                code: 20000,
                data: data[word]
            }
        }
    },
]

