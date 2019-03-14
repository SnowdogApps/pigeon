const { parse } = require('url')

const cors = require('../cors')
const mailer = require('../mailer')
const getConfig = require('../get-config')

module.exports = (localConfig = {}, isDev = false) => async (request, response) => {
  try {
    const params = parse(request.url, true).query
    const config = getConfig(params.id, localConfig)

    cors(request, response, config, isDev)
    await mailer(request, response, config, isDev)
  } catch (err) {
    response.statusCode = err.statusCode || 404
    response.end(err.message)
  }
}
