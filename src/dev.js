const path = require('path')
const http = require('http')
const { createTestAccount } = require('nodemailer')

const send = require('./api/send')
const form = require('./api/form')

;(async () => {
  const testAccount = await createTestAccount()

  const config = require(path.resolve(__dirname, '../pigeon.config.js'))

  config.transport = {
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
      await send(config, true)(req, res)
      res.end('Sent with success')
    }
    else if (req.url === '/form') {
      form(config, true)(req, res)
    }
    else {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('this page doesn\'t exist')
    }
  })

  server.listen(config.dev.port, '127.0.0.1')

  console.log(`Listening on: http://localhost:${config.dev.port}`) // eslint-disable-line no-console
})()
