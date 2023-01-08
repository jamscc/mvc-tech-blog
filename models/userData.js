const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class UserData extends Model { pwdCompare = (uPassVal, pwd) => bcrypt.compareSync(uPassVal, pwd) }

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
            validate: { len: [4] },
            allowNull: false
        }
    },
    {
        hooks: {
            beforeCreate: async (uNamePwd) => {
                try {
                    const { username, password } = uNamePwd;
                    const n = 12;
                    Promise.all([await bcrypt.hash(password, n), await username.toLowerCase()]).then((dt) => {
                        uNamePwd.password = dt[0];
                        uNamePwd.username = dt[1];
                        return uNamePwd
                    })
                } catch (re) { throw re }
            }
        },
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'userinfo'
    }
);

module.exports = UserData;