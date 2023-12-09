const express = require('express');
const YelpModel = require('../models/YelpModel');

const router = express.Router();

const ITEMS_PER_PAGE = 25; // Adjust this value based on your pagination needs

router.get('/fetchdata', async (req, res) => {
  try {
    const { page } = req.query;
    const offset = (page - 1) * ITEMS_PER_PAGE;

    const allData = await YelpModel.findAll({
      limit: ITEMS_PER_PAGE,
      offset,
    });

    res.send({ data: allData });
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
