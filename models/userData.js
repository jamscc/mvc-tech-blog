const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class UserData extends Model { }

UserData.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        username: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            validate: {len: [4]},
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'userinfo'
    }
);

module.exports = UserData;