// index.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const populateRoute = require('./routes/populateDB');

const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api', populateRoute);

// Sync the database and start the server
sequelize.sync({ force: true }) // set force to true to drop and re-create tables
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
