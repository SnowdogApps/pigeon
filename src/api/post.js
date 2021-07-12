const cors = require('../cors')
const getConfig = require('../get-config')
const mailer = require('../mailer')

module.exports = (localConfig = {}, isDev = false) => async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`)
    const id = url.searchParams.get('id')
    const config = await getConfig(id, localConfig, isDev)

    cors(request, response, config, isDev)
    if (!response.writableEnded) {
      await mailer(request, response, config, isDev)
    }
  } catch (err) {
    console.error('Error while processing POST request.', err) // eslint-disable-line no-console
    response.statusCode = err.statusCode || 404
    response.end(err.message)
  }
}
