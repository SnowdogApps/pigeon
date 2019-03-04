const mailer = require('./mailer')
const getConfig = require('./get-config')
const parseFormData = require('./parse-form-data')

module.exports = (localConfig = {}) => async (req, res) => {
  const config = getConfig(localConfig)

  try {
    if (req.method !== 'POST') {
      throw ({
        statusCode: 405,
        message: 'Only post method is allowed!'
      })
    }

    const formData = await parseFormData(req)

    await mailer(formData, config)

    res.end('Sent with success')
  } catch (err) {
    res.statusCode = err.statusCode || 404
    res.end(err.message)
  }
}
