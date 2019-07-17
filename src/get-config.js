const defaultsDeep = require('lodash.defaultsdeep')
const { createTestAccount } = require('nodemailer')

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

module.exports = async (formId, localConfig = {}, isDev = false) => {
  // Merge defaults with local config
  const config = defaultsDeep(localConfig, defaults)

  if (isDev) {
    const testAccount = await createTestAccount()

    config.transport = {
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    }
  }

  // Get a single form by ID
  const form = config.forms[formId] || null

  // Spread merged cofnig and selected form to new object
  return {
    ...config,
    ...form
  }
}
