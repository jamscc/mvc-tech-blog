const blogRtr = require('express').Router();
const rtHome = require('./homeRt');
const rtApiUser = require('./api');

blogRtr.use('/api', rtApiUser);
blogRtr.use('/', rtHome);

module.exports = blogRtr;