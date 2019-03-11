const path = require('path')
const fs = require('fs')
const http = require('http')
const { createTestAccount } = require('nodemailer')

const send = require('./api/send')
const form = require('./api/form')
const getConfig = require('./get-config')

let localConfig = {}

const localConfigPath = path.resolve(__dirname, '../pigeon.config.js')
if (fs.existsSync(localConfigPath)) {
  localConfig = require(localConfigPath)
}

const config = getConfig(localConfig)

;(async () => {
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

  const server = http.createServer(async (req, res) => {
    if (req.url === '/send') {
      await send(localConfig, true)(req, res)
      res.end('Sent with success')
    }
    else if (req.url === '/form') {
      form(localConfig, true)(req, res)
    }
    else {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('this page doesn\'t exist')
    }
  })

  server.listen(config.dev.port, '127.0.0.1')

  console.log(`Listening on: http://localhost:${config.dev.port}`) // eslint-disable-line no-console
})()
