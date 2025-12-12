const express = require('express');
const { sequelize } = require('./models');
const authorRoutes = require('./routes/authorRoutes');
const postRoutes = require('./routes/postRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/authors', authorRoutes);
app.use('/posts', postRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Blog API is running' });
});

// Sync DB and start server
const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }) // creates/updates tables based on models
  .then(() => {
    console.log('Database synced successfully');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

module.exports = app;
