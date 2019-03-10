const cors = require('../cors')
const getConfig = require('../get-config')

module.exports = (localConfig = {}, isDev = false) => (req, res) => {
  const config = getConfig(localConfig)
  cors(req, res, config, isDev)
  res.end(JSON.stringify(config.form.fields))
}
