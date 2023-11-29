const express = require('express');
const YelpModel = require("../models/YelpModel");
const { Op } = require('sequelize');

const router = express.Router();

router.get('/getParams', async (req, res) => {
  try {
    const filterAttributes = req.query;
    const whereClause = {
      [Op.and]: Object.entries(filterAttributes).map(([key, value]) => ({
        [key]: value,
      })),
    };

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
