module.exports = {
  cors: {
    allowedOrigins: ['https://pigeon.now.sh']
  },
  forms: {
    demo: {
      mail: params => ({
        from: params.email,
        to: params.email,
        subject: 'Pigeon test email',
        text: `
          Submitted on: ${params.date}
          Via: ${params.page}
          By ${params.ip} (visitor IP)

          First Name: ${params['first-name']}
          Last Name: ${params['last-name']}
          Email: ${params.email}
          Phone: ${params.phone}
          Agreement: ${params.agreement}
        `
      }),
      fields: [
        {
          id: 'first-name',
          type: 'text',
          name: 'first-name',
          label: 'First Name',
          required: false
        },
        {
          id: 'last-name',
          type: 'text',
          name: 'last-name',
          label: 'Last Name',
          required: true
        },
        {
          id: 'email',
          type: 'email',
          name: 'email',
          label: 'Email',
          required: true
        },
        {
          id: 'phone',
          type: 'phone',
          name: 'phone',
          label: 'Phone',
          required: true
        },
        {
          id: 'file',
          type: 'file',
          name: 'file',
          label: 'Your CV (pdf, max 1MB).',
          required: true
        },
        {
          id: 'agreement',
          type: 'checkbox',
          name: 'agreement',
          label: 'I agree that the submited data will be send to the given email',
          required: true
        }
      ]
    }
  }
}
