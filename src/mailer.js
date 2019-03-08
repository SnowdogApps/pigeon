const parseFormData = require('./parse-form-data')
const { createTransport, getTestMessageUrl } = require('nodemailer')

module.exports = async (request, config, isDev) => {
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

  mail.attachments = files.file ? files.file.map(({ size, originalFilename, path }) => {
    if (size) {
      return { filename: originalFilename, path }
    }
  }).filter(elem => elem) : []

  const info = await transporter.sendMail(mail)

  if (isDev) {
    console.log('Email sent! Preview URL: ' + getTestMessageUrl(info)) // eslint-disable-line no-console
  }
}
