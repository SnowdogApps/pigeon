const { USER, PASS, SERVICE } = process.env
const { send, createError } = require('micro')
const { createTransport } = require('nodemailer')
const multiparty = require('multiparty')

const promisifyUpload = (req) => new Promise((resolve, reject) => {
  const form = new multiparty.Form()

  form.parse(req, (err, fields, files) => {
      if (err) return reject(err)

      return resolve([fields, files])
  })
})

const transporter = createTransport({
  service: SERVICE,
  secure: true,
  auth: {
    user: USER,
    pass: PASS
  }
})

const mail = {
  from: USER,
  to: USER,
  subject: '',
  html: ''
}

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') throw createError(405, 'Only post is allowed!')

    const [fields, files] = await promisifyUpload(req)

    mail.cc = fields.copy ? fields.email : ''
    mail.subject = fields.subject.toString()
    mail.html = `${fields.email} sent a message: ${fields.msg}`
    mail.attachments = files.file ? files.file.map(({ size, originalFilename, path }) => {
      if (size) return { filename: originalFilename, path }
    }).filter(elem => elem) : []

    await transporter.sendMail(mail)
  
    send(res, 200, {
      code: 200,
      status: 'success',
      message: 'sent with success'
    })
  } catch (err) {
    send(res, err.statusCode, {
      code: err.statusCode,
      status: 'error',
      message: err.message
    })
  }
}
