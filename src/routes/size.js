'use strict';
const { sequelize, DataTypes } = require("../db/database");
const Sizes = require('../models/refsize')(sequelize, DataTypes);

const router = require('express').Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;


router.post('/addSize', async(req, res) => {
    const {height, width,weight} = req.body;
    const addItem = await Sizes.create({
        height:height,
        width:width,
        weight:weight,
    });

    res.status(200).json(addItem.id);
});



module.exports = router;
