// routes/populateRoute.js
const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const YelpModel = require('../models/YelpModel');

const router = express.Router();

router.post('/populate', async (req, res) => {
  try {
    const csvFilePath = '../yelp_file_2.csv'; // Specify the path to your CSV file

    // Read the CSV file and populate the YelpData model
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', async (data) => {
        try {
          // Create a new record in the database
          await YelpModel.create(data);
        } catch (error) {
          console.error('Error inserting row:', error);
        }
      })
      .on('end', () => {
        console.log('Database populated successfully');
        res.send('Database populated successfully');
      });
  } catch (error) {
    console.error('Error populating database:', error);
    res.status(500).send('Internal Server Error');
  }
 
});

module.exports = router;
