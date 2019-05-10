require('@babel/register');

const config = require('./server/config').default;

module.exports = config.database;
