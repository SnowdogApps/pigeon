const { parse } = require('url')

const cors = require('../cors')
const getConfig = require('../get-config')

module.exports = (localConfig = {}, isDev = false) => (request, response) => {
  try {
    const params = parse(request.url, true).query
    const config = getConfig(params.id, localConfig)

    cors(request, response, config, isDev)
    response.end(JSON.stringify(config.fields))
  } catch (err) {
    response.statusCode = err.statusCode || 404
    response.end(err.message)
  }
}
