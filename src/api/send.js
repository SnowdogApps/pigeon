const cors = require('../cors')
const mailer = require('../mailer')
const getConfig = require('../get-config')

module.exports = (localConfig = {}, isDev = false) => async (req, res) => {
  const config = getConfig(localConfig)
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
