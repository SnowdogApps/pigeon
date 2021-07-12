const { get } = require('../../../index')
const config = require('../pigeon.config')
const isDev = require('../is-dev')

module.exports = get(config, isDev)
