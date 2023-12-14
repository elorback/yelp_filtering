const express = require('express');
const YelpModel = require("../models/YelpModel");
const { Op } = require('sequelize');

const router = express.Router();
const ITEMS_PER_PAGE = 25; // Adjust this value based on your pagination needs

router.get('/filterdata', async (req, res) => {
  try {
    const { page, categories, ...search } = req.query;
    const whereClause = {
      [Op.and]: [],
    };

    const offset = (page - 1) * ITEMS_PER_PAGE;
    console.log("Search: ", search);
  
    // Below are filters for this table
for (const [key, value] of Object.entries(search)) {
  if (value !== 'null' && value !== null && value !== '') {
   // Modify condition to handle stars, review_count, and categories
const condition = key === 'stars' || key === 'review_count'
  ? { [key]: { [Op.gte]: parseFloat(value) } } // Use Op.gte for stars and review_count
  : key === 'categories'
  ? { [key]: { [Op.iLike]: `%${value}%` } } // Use Op.iLike for case-insensitive category search
  : { [key]: { [Op.like]: `%${value}` } }; // Use Op.like for other attributes

          
    whereClause[Op.and].push(condition);
  }
}


    const filteredData = await YelpModel.findAll({
      limit: ITEMS_PER_PAGE,
      offset,
      where: whereClause,
    });

    res.send({ data: filteredData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
