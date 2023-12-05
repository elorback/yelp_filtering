// index.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const populateRoute = require('./routes/populateDB');
const dataFilter = require('./routes/filterdata');
const fetchdata = require('./routes/fetchdata');

const app = express();
const PORT = 8000;

// Middleware for parsing JSON
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api', populateRoute);
app.use('/api', dataFilter);
app.use('/api',fetchdata)

// Sync the database and start the server
sequelize.sync({ force: false }) // set force to true to drop and re-create tables
  .then(() => {
    app.listen(PORT, () => {
      console.log(`\n\nServer is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
