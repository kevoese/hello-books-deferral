[![Build Status](https://travis-ci.com/bahdcoder/hello-books-deferral.svg?branch=master)](https://travis-ci.com/bahdcoder/hello-books-deferral)
[![](https://img.shields.io/badge/Protected%20by-Hound-%23d896ff.svg)](https://houndci.com)  [![Coverage Status](https://coveralls.io/repos/github/bahdcoder/hello-books-deferral/badge.svg?branch=master)](https://coveralls.io/github/bahdcoder/hello-books-deferral?branch=master)

# Hello Books

📚 A system that allows efficient, cost-effective management of our library.

## Prerequisites

Kindly ensure you install the following softwares

1. [Git](https://git-scm.com/)
2. [Node.js](https://nodejs.org/en/)
3. Node Package Manager (npm), this comes pre-installed with Node.js

## Getting Started

In order to get a copy of the project up and running on your local computer for development and testing purposes.
Do the following

1. Clone the repo.
2. Switch to project directory
3. Create a local `.env` file using the `.env.sample` file on the root folder
4. Type `npm install` to install dependencies
5. Type `npm run dev` to start development server or `npm start` to run in production

## Run Migrations

In other to run migrations, run
`npx knex migrate:latest` OR `npm run migrate`

To create a new migration, run
`npx knex migrate:make <tablename>` OR `npm run make:migration <tablename>`

To rollback a migration, run
`npx knex migrate:rollback <tablename>` OR `npm run migrate:rollback <tablename>`

To certify that the server is operational navigate to http://localhost:5000 on your browser and you should see the message.

```
{ message: 'Hello Books Deferral' }
```
## Using friendly-mail Service
To send email within the application using SMTP (mailtrap.io)

1. Update your local `.env` file with the following 
   `MAIL_USERNAME=YOUR_MAILTRAP_USERNAME` 
   `MAIL_PASSWORD=YOUR_MAILTRAP_PASSWORD` 
2. Import `Mail` class from `friendly-mail`
3. Create an instance of `new Mail('Example')` 

  Note: `Mail` is a chainable class 

  ```
  example: 

     const sampleMail = new Mail('Email Verification');
     sampleMail.to('user@mail.com')
               .subject('some message')
               .send()  // returns a promise
  ```  