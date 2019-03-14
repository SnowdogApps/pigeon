<p align="center">
  <img src="./assets/logo.svg" height="200">
</p>

# Pigeon
Simple open-source serverless API for sending emails and building forms effortlessly.

## Features
- **Simple** - Designed to remove the necessity of using Wordpress or another big backend just to have a contact form on the landing page
- **Fast and lightweight** - Serverless oriented, no framework, no database or other system-wide requirements
- **Form fields config** - You don't have to hardcode your form fields on front-end anymore, get them from API and build UI on the fly.
- **All well-knows SMTP services support** - Under the hood, we are using [nodemailer](https://github.com/nodemailer/nodemailer) and it supports a bunch of [well-known SMTP services](https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json)
- **No Admin Panel** - You are not limited by the UI or poor UX, just you and one JS config file
- **Front-end agnostic** - Simple REST API can be used by any application

## Demo
[Demo](https://pigeon.now.sh/)

[Source code](/examples/now)

## API
### `POST /`
Endpoint used to handle form submits

```js
const form = document.querySelector('#form')
const bodyFormData =  new FormData(form)
axios({
  method: 'post',
  url: '/',
  data: bodyFormData,
  headers: { 'Content-Type': 'multipart/form-data' },
  params: { id: 'myFormId' }
})
```

### `GET /`
Get configuration of form fields

```js
const { data } = axios.get('/', { params: { id: 'myFormId' } })
console.log(data)
// [
//   {
//     id: 'email',
//     type: 'email',
//     name: 'email',
//     label: 'Email',
//     required: true
//   }
// ]
```

## Config file

Defaults
```js
{
  locale: 'en-US',
  dev: {
    port: 8080
  },
  cors: {
    allowedOrigins: []
  },
  transport: {
    service: SERVICE,
    secure: true,
    auth: {
      user: USER,
      pass: PASS
    }
  },
  forms: {
    default: {
      mail: (params) => ({
        from: 'noreply@test.dev',
        to: 'noreply@test.dev',
        subject: 'Default subject',
        text: Object.keys(params).map(key => `${key}: ${params[key]}\n`).join('')
      }),
      fields: []
    }
  }
}
```

You can overwrite each part of this config by creating `pigeon.config.js`.

`transport` is [nodemailer's SMTP transport config object](https://nodemailer.com/smtp/).
By default, we are taking ENV variables `SERVICE`, `USER` and `PASS` to hydrate it.

`cors` is used to set `Access-Control-Allow-Origin` header acordingly to the settings.

`forms` object keys are used as IDs in requests params.

For security reasons you shouldn't keep **user** and **password** directly in the config file, but for example, keep them as a [secret variables](https://zeit.co/docs/v2/deployments/environment-variables-and-secrets/) if you are using [Now.sh](https://now.sh/).

## Local testing
To test and expose mailer locally on your machine run `yarn dev` / `npm run dev`
Development emails are send via [ethereal.email](https://ethereal.email/) service, instead of your desired SMTP transport, to preview sent messages.
