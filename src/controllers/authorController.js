const { Author, Post } = require('../models');

// POST /authors
exports.createAuthor = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const author = await Author.create({ name, email });
    res.status(201).json(author);
  } catch (error) {
    // unique email error
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Email must be unique' });
    }
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /authors
exports.getAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll();
    res.json(authors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /authors/:id
exports.getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findByPk(id);

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.json(author);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /authors/:id
exports.updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const author = await Author.findByPk(id);

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    if (name !== undefined) author.name = name;
    if (email !== undefined) author.email = email;

    await author.save();
    res.json(author);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Email must be unique' });
    }
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /authors/:id
exports.deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const author = await Author.findByPk(id);

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    await author.destroy(); // CASCADE will delete posts
    res.json({ message: 'Author and their posts deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /authors/:id/posts
exports.getPostsByAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    // check author exists
    const author = await Author.findByPk(id);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    const posts = await Post.findAll({
      where: { authorId: id },
      order: [['createdAt', 'DESC']],
    });

    res.json({
      author: {
        id: author.id,
        name: author.name,
        email: author.email,
      },
      posts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
