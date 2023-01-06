//dotenv
require('dotenv').config();

// express 
const express = require('express');
const urlParse = express.urlencoded({ extended: true });
const jsonParse = express.json();
// express-session
const session = require('express-session');

// helpers
const helpers = require('./utils/hpr');

// controllers
const rtAll = require('./controllers');

// express-handlebars
const eHandleBars = require('express-handlebars').create({helpers});
const { engine } = eHandleBars;

// sequelize
const sequelize = require('./config/connection');

// connect-session-sequelize
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const blogApp = express();

// path
const path = require('path');
const pathDir = __dirname;
const pathPublic = `public`;

const port = process.env.PORT || 3001;

blogApp.use(session({
    secret: process.env.SN_SCT,
    cookie: { maxAge: 6300000 },
    rolling: true,
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    })
}));

blogApp.use(urlParse);
blogApp.use(jsonParse);

blogApp.engine('handlebars', engine);
blogApp.set('view engine', 'handlebars');

blogApp.use(express.static(path.join(pathDir, pathPublic)));
blogApp.use(rtAll);

// sync
sequelize.sync().then(() => { blogApp.listen(port, () => { console.info("http://localhost:" + port); }) });