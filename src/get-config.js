const { USER, PASS, SERVICE } = process.env
const defaultsDeep = require('lodash.defaultsdeep')

const defaults = {
  service: SERVICE,
  secure: true,
  auth: {
    user: USER,
    pass: PASS
  }
}

module.exports = (config = {}) => {
  return defaultsDeep(config, defaults)
}
