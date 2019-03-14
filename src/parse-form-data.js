const multiparty = require('multiparty')

module.exports = (request) => new Promise((resolve, reject) => {
  const form = new multiparty.Form()

  form.parse(request, (err, fields, files) => {
    if (err) {
      return reject(err)
    }

    return resolve([fields, files])
  })
})
