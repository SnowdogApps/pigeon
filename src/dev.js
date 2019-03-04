const fs = require('fs')
const path = require('path')
const http = require('http')
const app = require('./app')

const localConfigPath = path.resolve(__dirname, '../config.json')

let localConfig = {}
if (fs.existsSync(localConfigPath)) {
  localConfig = require(localConfigPath)
}

const server = http.createServer(async (req, res) => {
  if (req.url === '/') {
    res.end('This connection is alive!')
  } else if (req.url === '/send') {
    try {
      await app(localConfig)(req, res)

      res.end('Sent with success')
    } catch (err) {
      res.statusCode = err.statusCode || 404
      res.end(err.message)
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('this page doesn\'t exist')
  }
})

server.listen(8080, '127.0.0.1')

console.log('Listening on: http://localhost:8080') // eslint-disable-line no-console
