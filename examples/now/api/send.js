const { send } = require('@snowdog/pigeon')
const config = require('./pigeon.config')

module.exports = send(config)
