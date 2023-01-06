require('dotenv').config();
const Sequelize = require('sequelize');

switch (true) {
  case (!process.env.JAWSDB_URL):
    var sequelize = new Sequelize(process.env.DATAB_NM, process.env.DATAB_U, process.env.DATAB_PWD, { host: 'localhost', dialect: 'mysql', port: 3306 });
    break;
  default:
    var sequelize = new Sequelize(process.env.JAWSDB_URL);
}

module.exports = sequelize;