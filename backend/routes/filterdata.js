const express = require('express');
const YelpModel = require("../models/YelpModel");
const { Op } = require('sequelize');

const router = express.Router();
const ITEMS_PER_PAGE = 25; // Adjust this value based on your pagination needs

router.get('/filterdata', async (req, res) => {
  try {
    const {search,...filterAttributes} = req.query;
    const whereClause = {
      [Op.and]: [],
    };
    const page = req.query.page || 1; // Get the page from the query parameters

    const offset = (page - 1) * ITEMS_PER_PAGE;

    // Build the whereClause based on the provided parameters
    Object.entries(filterAttributes).forEach(([key, value]) => {
      // Check if the value is not empty or null
      if (value !== '' && value !== null) {
        // If the key is 'categories', use the $in operator
        const condition = key === 'categories' ? { [key]: { [Op.in]: value.split(',') } } : { [key]: value };
        whereClause[Op.and].push(condition);
      }
    });
    if(search){
      whereClause[Op.and].push({
        [Op.or] : [
          {name: {[Op.like]:`%${search}`}},
          {address: {[Op.like]:`%${search}`}},
          {city: {[Op.like]:`%${search}`}},
          {state: {[Op.like]:`%${search}`}},
          {postal_code: {[Op.like]:`%${search}`}},
          {stars: {[Op.like]:`%${search}`}},
          {review_count: {[Op.like]:`%${search}`}},
    
        ]
      })
    }

    const filteredData = await YelpModel.findAll({
      limit: ITEMS_PER_PAGE,
      offset: offset,
      where: whereClause,
    });

    res.send({ data: filteredData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
