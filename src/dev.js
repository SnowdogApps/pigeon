const { parse } = require('url')
const path = require('path')
const fs = require('fs')
const http = require('http')
const { createTestAccount } = require('nodemailer')

const get = require('./api/get')
const post = require('./api/post')
const getConfig = require('./get-config')
const cors = require('./cors')

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

    cors(request, response, config, true)

    if (request.method === 'GET') {
      get(localConfig, true)(request, response)
    }

    if (request.method === 'POST') {
      await post(localConfig, true)(request, response)
    }
  })

  server.listen(config.dev.port, '127.0.0.1')

  console.log(`Listening on: http://localhost:${config.dev.port}`) // eslint-disable-line no-console
}
