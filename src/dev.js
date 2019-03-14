const { parse } = require('url')
const path = require('path')
const fs = require('fs')
const http = require('http')
const { createTestAccount } = require('nodemailer')

const send = require('./api/post')
const form = require('./api/get')
const getConfig = require('./get-config')

module.exports = async () => {
  let localConfig = {}

  const localConfigPath = path.resolve('./pigeon.config.js')
  if (fs.existsSync(localConfigPath)) {
    localConfig = require(localConfigPath)
  }

  const config = getConfig(localConfig)

  const testAccount = await createTestAccount()

  localConfig.transport = {
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  }

  const server = http.createServer(async (request, response) => {
    const pathName = parse(request.url).pathname
    if (pathName !== '/') {
      response.writeHead(404, { 'Content-Type': 'text/plain' })
      response.end('this page doesn\'t exist')
      return
    }

    if (request.method === 'POST') {
      await send(localConfig, true)(request, response)
    }

    if (request.method === 'GET') {
      form(localConfig, true)(request, response)
    }
  })

  server.listen(config.dev.port, '127.0.0.1')

  console.log(`Listening on: http://localhost:${config.dev.port}`) // eslint-disable-line no-console
}
