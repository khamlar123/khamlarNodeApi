'use strict';
const { sequelize, DataTypes } = require("../db/database");
const Reftype = require('../models/reftype')(sequelize, DataTypes);

const router = require('express').Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;


router.get('/getreftype', async(req, res) => {
    try{
        const filterItems = await Reftype.findAll();
        res.status(200).json(filterItems);
    }catch(e){
        res.status(500).json(e);
    }
});

router.post('/addreftype', async(req, res) => {
    try{
        const {name, orderIndex} = req.body;
        const addItem = await Reftype.create({
            name:name,
            orderIndex:orderIndex,
        });
        res.status(200).json(addItem.id);
    }catch(e){
        res.status(500).json(e);
    }
});

router.put('/editreftype', async(req, res) => {
    try{
        const {name, orderIndex, id} = req.body;
        const addItem = await Reftype.update({
            name:name,
            orderIndex:orderIndex,
        }, {where:{id:id}});
        res.status(200).json(addItem.id);
    }catch(e){
        res.status(500).json(e);
    }
});

router.delete('/deletereftype', async(req, res) => {
    try{
        const {typeid} = req.query;
        const deleteReftype = await Reftype.destroy({where:{id:typeid}});
        res.status(200).json(deleteReftype);
    }catch(e){
        res.status(500).json(e);
    }
});


module.exports = router;
