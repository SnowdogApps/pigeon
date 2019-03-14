const { get } = require('@snowdog/pigeon')
const config = require('./pigeon.config')

module.exports = get(config)
