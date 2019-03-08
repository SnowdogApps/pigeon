const cors = require('../cors')

module.exports = (config, isDev = false) => (req, res) =>{
  cors(req, res, config, isDev)
  res.end(JSON.stringify(config.form.fields))
}
