'use strict';
const { sequelize, DataTypes } = require("../db/database");
const Imgitems = require('../models/imgitems')(sequelize, DataTypes);
const Refimgs = require('../models/refimgs')(sequelize, DataTypes);
const Sh = require('./shared');
const router = require('express').Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get('/get-imgitem', async(req, res) => {
    try{
        const imgitem = await Imgitems.findAll();
        res.status(200).json(imgitem);
    }catch(e){ 
        res.status(500).json(e);
    };
});

router.post('/add-imgitem',Sh.uploadImgFunc().single('imgUrl'),  async(req, res) => {
    try{    
        const {orderIndex,refImgId,link,status} =req.body;
        const addModel = {
            orderIndex: orderIndex,
            refImgId: refImgId,
            link: link,
            status: status,
        }
        const addImgItem = await Imgitems.create(addModel);
        res.status(200).json(addImgItem);
    }catch(e){
        res.status(500).json(e);
    }
});

router.delete('/delete-imgitem', async(req, res) => {
    try{
        const findItem = await Imgitems.findOne({where: {id: req.query.id}});
        (!findItem)? res.status(404).json(`No't have img`): null;
        Sh.deleteImgFunc(findItem.imgUrl);
        const deleteItem = await Imgitems.destroys({where:{id:req.query.id}});
        res.status(200).json(deleteItem);
    }catch(e){
        res.status(500).json(e);
    }
});

router.put('/edit-imgitem', Sh.uploadImgFunc().single('imgUrl'), async(req, res) => {
    try{
        const {id,orderIndex,refImgId,link,status} = req.body;
        const findItem = await Imgitems.findOne({where: {id:id}});
        (!findItem)? res.status(404).json(`No't have img`): null;  
        Sh.deleteImgFunc(findItem.imgUrl);
        findItem.orderIndex = orderIndex;
        findItem.refImgId = refImgId;
        findItem.link = link;
        findItem.status = status;
        const updateItem = await Imgitems.updateOne({where:{id:id}}, findItem.dataValues);
        res.status(200).json(updateItem);
    }catch(e){
        res.status(500).json(e);
    }
});

router.get('/get-refimges', async (req, res) => {
    try{
        const filterItems = await Refimgs.findAll();
        res.status(200).json(filterItems);
    }catch(e){
        res.status(500).json(e);
    }
});

router.post('/add-refimge', async (req, res) => {
    try{
        const addItem = await Refimgs.create({ name: req.body.name});
        res.status(200).json(addItem.id);
    }catch(e){
        res.status(500).json(e);
    }
})

router.delete('/delete-refimge', async (req, res) => {
    try{
        const findItem = await Refimgs.findOne({where:{id: req.query.id}});
        (!findItem)? res.status(404).json(`No't have img`): null;
        const deleteItem = await Refimgs.destroy({where:{id:req.query.id}});
        res.status(200).json(deleteItem.id);
    }catch(e){
        res.status(500).json(e);
    }
});

router.put('/edit-refimge', async (req, res) => {
    try{
        const{id, name} = req.body;
        const findItem = await Refimgs.findOne({where:{id:id}});
        (!findItem)? res.status(404).json(404): null;
        findItem.name = name;
        const updateItem = await Refimgs.update(findItem.dataValues,{where:{id:id}});
        res.status(200).json(updateItem.id);
    }catch(e){
        res.status(500).json(e);
    }
});

module.exports = router;
