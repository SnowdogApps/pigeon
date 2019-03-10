const defaultsDeep = require('lodash.defaultsdeep')

const { USER, PASS, SERVICE } = process.env

const defaults = {
  locale: 'en-US',
  dev: {
    port: 8080
  },
  cors: {
    allowedOrigins: []
  },
  transport: {
    service: SERVICE,
    secure: true,
    auth: {
      user: USER,
      pass: PASS
    }
  },
  mail: (params) => ({
    from: 'noreply@test.dev',
    to: 'noreply@test.dev',
    subject: 'Default subject',
    text: Object.keys(params).map(key => `${key}: ${params[key]}\n`).join('')
  }),
  form: {
    fields: []
  }
}

module.exports = (config = {}) => {
  return defaultsDeep(config, defaults)
}
