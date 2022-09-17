'use strict';
const { sequelize, DataTypes } = require("../db/database");
const Categories = require('../models/categories')(sequelize, DataTypes);
const Sh = require('./shared');
const router = require('express').Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get('/get-categories', async (req, res) => {
    try{
        const categories = await Categories.findAll();
        res.status(200).json(categories);
    }catch(e){ 
        res.status(500).json(e);
    }
});

router.post('/add-categories', Sh.uploadImgFunc().single("url"),  async (req, res) => {
    try{
        const {cateName,orderIndex,parentId,status} = req.body;
        const addModel = {
            cateName:cateName,
            orderIndex: orderIndex,
            parentId: parentId,
            status: status,
            url: req.file.filename,
        }
        const addCategory = await Categories.create(addModel);
        res.status(200).json(addCategory.id);

    }catch(e){
        res.status(500).json(e);
    }
});

router.delete('/delete-categories', async(req, res) => {
    try{
        const findItem = await Categories.find({id: req.query.id});
        (!findItem)? res.status(404).json(`No't have item`): null;
        res.status(200).json(findItem);
    }catch(e)
        {res.status(500).json(e)
    }
});

router.put('/edit-categories',Sh.uploadImgFunc().single("url"), async (req, res) => {
    try{
        const {id,cateName,orderIndex,parentId,status} = req.body;
        const findItem = await Categories.findOne({id:id});
        findItem.status = status;
        findItem.cateName = cateName;
        findItem.orderIndex = orderIndex;
        findItem.parentId = parentId;
        findItem.url = req.file.filename;
        const updateItem = await Categories.update(findItem.dataValues,{where:{id:id}});
        res.status(200).json(updateItem);
    }catch(e){
        res.status(500).json(e);
    }
});

module.exports = router;
