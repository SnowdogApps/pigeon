const fs = require('fs')
const path = require('path')
const send = require('./src/mailer')
const parseFormData = require('./src/parse-form-data')
const getConfig = require('./src/get-config')

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      throw ({
        statusCode: 405,
        message: 'Only post method is allowed!'
      })
    }

    const localConfigPath = path.resolve(`${__dirname}/mailer.json`)

    let localConfig = {}
    if (fs.existsSync(localConfigPath)) {
      localConfig = require(localConfigPath)
    }

    const config = getConfig(localConfig)
    const formData = await parseFormData(req)

    await send(formData, config)

    res.end('Sent with success')
  } catch (err) {
    res.statusCode = err.statusCode || 404
    res.end(err.message)
  }
}
