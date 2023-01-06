const Blog = require('./blog');
const UserData = require('./userData');
const Comment = require('./comments');

// associations
Blog.belongsTo(UserData, { foreignKey: 'user_id' });
UserData.hasMany(Blog, { foreignKey: 'user_id', onDelete: 'CASCADE' });

Comment.belongsTo(UserData, { foreignKey: 'user_id' });
UserData.hasMany(Comment, { foreignKey: 'user_id', onDelete: 'CASCADE' });

Comment.belongsTo(Blog, { foreignKey: 'blog_id', onDelete: 'CASCADE'});
Blog.hasMany(Comment, { foreignKey: 'blog_id', onDelete: 'CASCADE' });

module.exports = { Blog, UserData, Comment };