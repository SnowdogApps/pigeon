const cors = require('../cors')
const mailer = require('../mailer')

module.exports = (config, isDev = false) => async (req, res) => {

  try {
    cors(req, res, config, isDev)
    if (req.method === 'POST') {
      await mailer(req, config, isDev)
      res.end('Sent with success')
    }
  } catch (err) {
    res.statusCode = err.statusCode || 404
    res.end(err.message)
  }
}
