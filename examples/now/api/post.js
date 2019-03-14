const { post } = require('@snowdog/pigeon')
const config = require('./pigeon.config')

module.exports = post(config)
