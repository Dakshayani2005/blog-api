🏗️ Architecture – Blog API

This project follows a clean backend architecture using Node.js, Express, Sequelize, and MySQL to manage authors and their posts.
It demonstrates a real-world one-to-many relationship with proper data integrity, cascade deletes, and efficient querying.

🔄 Workflow

1.Client sends a request (create author, create post, update, delete, fetch data).
2.Express routes forward the request to the appropriate controller.
3.Controllers validate inputs and call Sequelize ORM functions.
4.Sequelize communicates with MySQL to:
  Create or retrieve authors and posts
  Enforce foreign key rules
  Apply cascade delete behavior
  Perform JOIN queries for efficient data loading
5.MySQL stores all authors and posts, ensuring relational accuracy.
6.API sends back a structured JSON response.

🧩 Components Involved

1.Express.js – Routing Layer
  Handles all incoming HTTP requests
  Maps URL paths to controllers
  Processes JSON data from clients
2.Sequelize ORM – Data Modeling Layer
  Defines Author and Post models
  Implements the 1-to-many relationship
  Performs eager loading to avoid N+1 queries
  Handles foreign key constraints (authorId)
  Automatically deletes related posts using ON DELETE CASCADE
3.MySQL – Database Layer
  Stores all authors and posts in two tables
  Enforces:
    Unique email constraint
    Author–post relationship
  Cascading delete rules
  Ensures reliable relational data management
4.Controllers – Business Logic
  Create, read, update, delete authors
  Create, read, update, delete posts
  Validate author existence before creating posts
  Return clean and consistent JSON responses

🗄️ Database Schema

Authors Table
  id (Primary Key)
  name
  email (Unique)
  createdAt
  updatedAt

Posts Table
  id (Primary Key)
  title
  content
  authorId (Foreign Key → authors.id)
  createdAt
  updatedAt

📊 ERD – Entity Relationship Diagram

Authors (1) --------> (∞) Posts

+-------------+             +--------------+
|   Authors   |             |    Posts     |
+-------------+             +--------------+
| id (PK)     |    1 → ∞    | id (PK)      |
| name        |             | title        |
| email       |             | content      |
+-------------+             | authorId (FK)|
                            +--------------+

🚀 Development Setup

1.Install dependencies
  npm install
2.Create MySQL database
  CREATE DATABASE blog_api;
3.Configure .env file
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=your_mysql_password
  DB_NAME=blog_api
  PORT=3000
4.Start the server
  npm run dev

📚 API Overview

Author APIs
  POST /authors
  GET /authors
  GET /authors/:id
  PUT /authors/:id
  DELETE /authors/:id
Post APIs
  POST /posts
  GET /posts
  GET /posts/:id
  PUT /posts/:id
  DELETE /posts/:id
Nested
  GET /authors/:id/posts

