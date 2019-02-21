# Snowdog serverless mailer service
Allows to send the complete form data (with files) within **POST** method.

## Specification
- allowed methods: **POST** only
- allowed inputs[name]: **email**, **msg**, **subject**, **copy** and **file**

## Deploy ([now.sh](https://zeit.co/now))
Install the latest version of Now CLI - `npm install -g now`
Type `now` in the project root directory to start deploy changes.

## Project variables

- user - email account address
- pass - password to the email account
- service - email provider like 'Gmail', 'Zoho' etc - list of all well-known supported services avaiable [here.](https://nodemailer.com/smtp/well-known/)

From security reasons you should add **user** and **password** related variables as a [secret variables](https://zeit.co/blog/environment-variables-secrets):

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
