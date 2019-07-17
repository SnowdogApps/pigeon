const { post } = require('../../../index')
const config = require('./pigeon.config')
const isDev = require('./is-dev')

module.exports = post(config, isDev)
