const express = require('express');
const YelpModel = require("../models/YelpModel");
const { Op } = require('sequelize');

const router = express.Router();

router.get('/filterdata', async (req, res) => {
  try {
    const filterAttributes = req.query;
    const whereClause = {
      [Op.and]: [],
    };

    // Build the whereClause based on the provided parameters
    Object.entries(filterAttributes).forEach(([key, value]) => {
      // Check if the value is not empty or null
      if (value !== '' && value !== null) {
        // If the key is 'categories', use the $in operator
        const condition = key === 'categories' ? { [key]: { [Op.in]: value.split(',') } } : { [key]: value };
        whereClause[Op.and].push(condition);
      }
    });
    

    const filteredData = await YelpModel.findAll({
      where: whereClause,
    });

    res.send({ data: filteredData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
