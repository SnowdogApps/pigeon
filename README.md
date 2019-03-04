# Snowdog serverless mailer service
Allows to send the complete form data (with files) within **POST** method.

## Specification
- allowed methods: **POST** only
- allowed inputs[name]: **email**, **msg**, **subject**, **copy** and **file**

## Deploy ([now.sh](https://zeit.co/now))
Install the latest version of Now CLI - `npm install -g now`
Type `now` in the project root directory to start deploy changes.

## Project variables

- `user` - email account address
- `pass` - password to the email account
- `service` - email provider like Gmail, Zoho etc - [list of all supported services.](https://nodemailer.com/smtp/well-known/)

From security reasons you should add **user** and **password** related variables as a [secret variables](https://zeit.co/docs/v2/deployments/environment-variables-and-secrets/):

### How to add secret variables to project
```
now secret add user user@email.com
now secret add pass secret
```
### How to use secret variables
All variables are registered in **now.json** file and are ready to use after deploy like so:
```
const { USER, PASS, SERVICE } = process.env
```

## Project configuration
You can override config by update (creating) `mailer.json` config file in root directory.<br>
You can also specify here to whom message will be delivered by adding to `definedRecipients` (in mentioned config file) corresponding values like: "form_code": "recipeint@mail.com". eg:
```
{
    "definedRecipients": {
        "helloForm": "robert.wozniak@snow.dog"
    }
}
```

## Local testing
To test and expose mailer locally on you machine type `node now.js`
