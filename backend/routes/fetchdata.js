const express = require('express');
const YelpModel = require('../models/YelpModel');

const router = express.Router();

router.get('/fetchdata', async (req, res) => {
  try {
    const page = 1;
    const pageSize =  25;

    const offset = (page - 1) * pageSize;

    const allData = await YelpModel.findAll({ offset, limit: pageSize });

    res.send({ data: allData });
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
