const { parse } = require('url')

const cors = require('../cors')
const getConfig = require('../get-config')

module.exports = (localConfig = {}, isDev = false) => (request, response) => {
  const params = parse(request.url, true).query

  const config = getConfig(params.id, localConfig)
  cors(request, response, config, isDev)
  response.end(JSON.stringify(config.fields))
}
