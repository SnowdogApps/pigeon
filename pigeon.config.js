const { USER, PASS, SERVICE } = process.env

module.exports = {
  locale: 'en-US',
  dev: {
    port: 8080
  },
  cors: {
    allowedOrigins: ['snow.dog']
  },
  transport: {
    service: SERVICE,
    secure: true,
    auth: {
      user: USER,
      pass: PASS
    }
  },
  mail: (params) => ({
    from: 'bartek.igielski@snow.dog',
    to: 'bartek.igielski@snow.dog',
    subject: `JOBTITLE:${params['job-title']}`,
    text: `
      A new application for ${params['job-title']} (from: '${params['first-name']} ${params['last-name']}')
      ============================================
      Submitted on: ${params.date}
      Via: ${params.page}
      By ${params.ip} (visitor IP)
      First Name: ${params['first-name']}
      Last Name: ${params['last-name']}
      Job position: ${params['job-title']}
      Email: ${params.email}
      Phone: ${params.phone}
    `
  }),
  form: {
    fields: [
      {
        id: 'job-title',
        type: 'hidden',
        name: 'job-title',
        label: 'Job position',
        required: false,
        readonly: false,
        disabled: false
      },
      {
        id: 'first-name',
        type: 'text',
        name: 'first-name',
        label: 'First Name',
        required: false,
        readonly: false,
        disabled: false
      },
      {
        id: 'last-name',
        type: 'text',
        name: 'last-name',
        label: 'Last Name',
        required: true,
        readonly: false,
        disabled: false
      },
      {
        id: 'email',
        type: 'text',
        name: 'email',
        label: 'Email',
        required: true,
        readonly: false,
        disabled: false
      },
      {
        id: 'phone',
        type: 'text',
        name: 'phone',
        label: 'Phone',
        required: true,
        readonly: false,
        disabled: false
      },
      {
        id: 'file',
        type: 'file',
        name: 'file',
        label: 'Your CV (pdf, max 1MB).',
        required: true,
        readonly: false,
        disabled: false
      },
      {
        id: 'agreement',
        type: 'checkbox',
        name: 'agreement',
        label: 'I agree to the processing of personal data submitted for the consideration of my application to work for Snowdog',
        required: true,
        readonly: false,
        disabled: false
      }
    ]
  }
}
