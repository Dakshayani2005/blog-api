const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Sequelize will create authorId column because of association,
    // but we define it explicitly to make it clear & non-null.
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'posts',
    timestamps: true,
  });

  return Post;
};
