const express = require('express');
const YelpModel = require('../models/YelpModel');
const { Sequelize } = require('sequelize'); // Make sure to import Op if you're using it

const router = express.Router();

router.get('/fetchdatalist', async (req, res) => {
  try {
   

    const uniqueStates = await YelpModel.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('state')), 'state']
      ],
      raw: true,
    });

    const uniqueStars = await YelpModel.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('stars')), 'stars']
      ],
      raw: true,
    });
    console.log("unique states: ",uniqueStates, '\n unique stars', uniqueStars);

    

    res.send({
      data:{uniqueStates,uniqueStars}
    });
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
