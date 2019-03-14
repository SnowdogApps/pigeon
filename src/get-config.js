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
  forms: {
    default: {
      mail: (params) => ({
        from: 'noreply@test.dev',
        to: 'noreply@test.dev',
        subject: 'Default subject',
        text: Object.keys(params).map(key => `${key}: ${params[key]}\n`).join('')
      }),
      fields: []
    }
  }
}

module.exports = (formId, localConfig = {}) => {
  // Merge defaults with local config
  const config = defaultsDeep(localConfig, defaults)

  // Get a single form by ID
  const form = config.forms[formId] || null

  // Remove not necessary forms from config
  delete config.forms

  // Spread merged cofnig and selected form to new object
  return {
    ...config,
    ...form
  }
}
