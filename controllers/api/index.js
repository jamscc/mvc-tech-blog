const apiRtr = require('express').Router();
const rtU = require('./userRt');
apiRtr.use('/users', rtU);
module.exports = apiRtr;