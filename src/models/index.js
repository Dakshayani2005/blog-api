const sequelize = require('../config/database');
const AuthorModel = require('./author');
const PostModel = require('./post');

// Initialize models
const Author = AuthorModel(sequelize);
const Post = PostModel(sequelize);

// Associations (one-to-many)
// Author 1 --- * Post
Author.hasMany(Post, {
  foreignKey: 'authorId',
  as: 'posts',
  onDelete: 'CASCADE',     // important: cascade delete
  hooks: true,             // for CASCADE to work with Sequelize destroy()
});

Post.belongsTo(Author, {
  foreignKey: 'authorId',
  as: 'author',
});

module.exports = {
  sequelize,
  Author,
  Post,
};
