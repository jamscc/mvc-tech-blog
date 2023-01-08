const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Comment extends Model { }

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        comment_text: {
            type: DataTypes.STRING(1200),
            allowNull: false
        },

        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'userinfo',
                key: 'id',
            },
        },

        blog_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'blog',
                key: 'id',
            },
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

module.exports = Comment;