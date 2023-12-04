const express = require('express');
const YelpModel = require('../models/YelpModel');

const router = express.Router();

router.get('/fetchdata', async (req,res)=>{
try{

    const allData = await YelpModel.findAll();
    res.send({data:allDatadata});

}catch(err){
    console.error(err);
    res.status(500).json("Internal Server Error");
}

});
module.exports = router;