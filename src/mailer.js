const flatten = require('lodash.flatten')
const { createTransport, getTestMessageUrl } = require('nodemailer')
const parseFormData = require('./parse-form-data')

module.exports = async (request, response, config, isDev) => {
  const transporter = createTransport(config.transport)
  await transporter.verify()

  const [fields, files] = await parseFormData(request)

  const date = new Date()
  fields.date = date.toLocaleString(config.locale)

  if (request.connection.remoteAddress) {
    fields.ip = request.connection.remoteAddress
  }

  if (request.headers.referer) {
    fields.page = request.headers.referer
  }

  const mail = config.mail(fields)

  if (Object.keys(files).length) {
    const attachments = flatten(Object.keys(files).map(key => files[key]))
    mail.attachments = attachments.map(
      file => ({ filename: file.originalFilename, path: file.path })
    )
  }

  const info = await transporter.sendMail(mail)

  if (!isDev) {
    response.end('Sent with success')
  }
  else {
    const message = 'Email sent! Preview URL: ' + getTestMessageUrl(info)
    console.log(message) // eslint-disable-line no-console
    response.end(message)
  }
}
