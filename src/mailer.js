const { createTransport } = require('nodemailer')

module.exports = async (form, config) => {
  try {
    const transporter = createTransport(config.transport)
    await transporter.verify()

    const [fields, files] = form
    const mail = {
      ...config.message
    }

    // mail.cc = fields.copy ? fields.sender : ''
    // mail.subject = fields.subject ? fields.subject.toString() : 'No subject defined'

    // mail.html = Object.keys(fields).map(key => {
    //   return `<p><strong>${key}:</strong> ${fields[key].toString()}</p>`
    // }).join(' ')

    mail.attachments = files.file ? files.file.map(({ size, originalFilename, path }) => {
      if (size) {
        return { filename: originalFilename, path }
      }
    }).filter(elem => elem) : []

    await transporter.sendMail(mail)

  } catch (err) {
    throw ({
      statusCode: err.statusCode || 404,
      message: err.message
    })
  }
}
