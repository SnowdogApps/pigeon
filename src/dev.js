const http = require('http');
const path = require('path');
const mailer = require('../index.js');

const server = http.createServer(async (req, res) => {
  if (req.url === path.normalize('/')) {
    res.end('This connection is alive!');
  } else if (req.url === path.normalize('/send')) {

    try {
      await mailer(req, res);

      res.end('Sent with success')
    } catch (err) {
      res.statusCode = err.statusCode || 404
      res.end(err.message)
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('this page doesn\'t exist');
  }
});

server.listen(8080, '127.0.0.1');

console.log('Listening on: http://localhost:8080') // eslint-disable-line no-console
