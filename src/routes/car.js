'use strict';
const { sequelize, DataTypes } = require("../db/database");
const Car = require('../models/car')(sequelize, DataTypes);

const router = require('express').Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get('/getcar', async(req, res) => {
    try{
        const {kw} = req.query;
        const filterItems = await Car.findAll({
            where:{
                carNumber:{[Op.like]:"%"+kw+"%"}  
            }
        });
        res.status(200).json(filterItems); 
    }catch(e){
        res.status(500).json(e);
    }
});

router.post('/addcar', async(req, res) => {
    try{
        const {carNumber, status,orderIndex,remarks,star} = req.body;
        const addcar = await Car.create({
            carNumber:carNumber, 
            status:status,
            orderIndex:orderIndex,
            remarks:remarks,
            star:star, 
        });
        res.status(200).json(addcar);
    }catch(e){
        res.status(500).json(e);
    }
});

router.delete('/deletecar', async(req, res) => {
    try{
        const {cid} =req.query;
        const deleteItem = await Car.destroy({where:{id:cid}});
        res.status(200).json(deleteItem);
    }catch(e){
        res.status(500).json(e);
    }
});

router.put('/updatecar', async(req, res) => {
    try{
        const {carNumber, status,orderIndex,remarks,star,id} = req.body;
        const updateCar = await Car.update({
            carNumber: carNumber,
            status: status,
            orderIndex:orderIndex,
            remarks: remarks,
            star: star,
        },{where:{id:id}});
        res.status(200).json(updateCar);
    }catch(e){
        res.status(500).json(e);
    }
});

module.exports = router;
