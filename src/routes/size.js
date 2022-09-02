'use strict';
const { sequelize, DataTypes } = require("../db/database");
const Sizes = require('../models/refsize')(sequelize, DataTypes);

const router = require('express').Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;


router.get('/getsize', async(req, res) => {
    try{
        const filterItems = await Sizes.findAll();
        res.status(200).json(filterItems);
    }catch(e){
        res.status(500).json(e);
    }
});

router.post('/addsize', async(req, res) => {
    try{
        const {height, width,weight} = req.body;
        const addItem = await Sizes.create({
            height:height,
            width:width,
            weight:weight,
        });
        res.status(200).json(addItem.id);
    }catch(e){
        res.status(500).json(e);
    }
});

router.put('/editsize', async(req, res) => {
    try{
        const {height, width,weight, id} = req.body;
        const addItem = await Sizes.update({
            height:height,
            width:width,
            weight:weight,
        }, {where:{id:id}});
        res.status(200).json(addItem.id);
    }catch(e){
        res.status(500).json(e);
    }
});

router.delete('/deletesize', async(req, res) => {
    try{
        const {sizeid} = req.query;
        const deleteSize = await Sizes.destroy({where:{id:sizeid}});
        res.status(200).json(deleteSize);
    }catch(e){
        res.status(500).json(e);
    }
});


module.exports = router;
