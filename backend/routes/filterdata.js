const express = require('express');
const YelpModel = require("../models/YelpModel");
const { Op } = require('sequelize');

const router = express.Router();
const ITEMS_PER_PAGE = 25; // Adjust this value based on your pagination needs

router.get('/filterdata', async (req, res) => {
  try {
    const {search,page, ...filterAttributes} = req.query;
    const whereClause = {
      [Op.and]: [],
    };

    console.log(req.query);
    const offset = (page - 1) * ITEMS_PER_PAGE;
    console.log('Page:',page,' search: ',search);

    // checks to filter what attributes to filter for, and checks
    // if specified category exists within category list
    Object.entries(filterAttributes).forEach(([key, value]) => {
      // Check if the value is not empty or null
      if (value !== '' && value !== null) {
        // If the key is 'categories', use the $in operator
        const condition = key === 'categories' ? { [key]: { [Op.in]: value.split(',') } } : { [key]: value };
        whereClause[Op.and].push(condition);
      }
    });
    //below are filters for this table
    if(search){
      whereClause[Op.and].push({
        [Op.or] : [
          {name: {[Op.like]:`%${search}`}},
          {city: {[Op.like]:`%${search}`}},
          {state: {[Op.like]:`%${search}`}},
          {stars: {[Op.like]:`%${search}`}},
          {review_count: {[Op.like]:`%${search}`}},
    
        ]
      })
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
