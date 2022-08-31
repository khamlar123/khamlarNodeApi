'use strict';
const { sequelize, DataTypes } = require("../db/database");
const Items = require('../models/items')(sequelize, DataTypes);
const Refsizes = require('../models/refsize')(sequelize, DataTypes);
const Reftype = require('../models/reftype')(sequelize, DataTypes);
const Customers = require('../models/customers')(sequelize, DataTypes);
const Users = require('../models/user')(sequelize, DataTypes);
const Refinventory = require('../models/refinventory')(sequelize, DataTypes);
const router = require('express').Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

Refsizes.hasOne(Items, {foreignKey: 'itemSizeId'});
Items.belongsTo(Refsizes, {foreignKey: 'itemSizeId'});
Reftype.hasOne(Items, {foreignKey:'trypeId'});
Items.belongsTo(Reftype, {foreignKey:'trypeId'});
Customers.hasOne(Items, {foreignKey:'cutomerId'});
Items.belongsTo(Customers, {foreignKey:'cutomerId'});
Users.hasOne(Items, {foreignKey:'userId'});
Items.belongsTo(Users, {foreignKey:'userId'});
Refinventory.hasOne(Items, {foreignKey:'inventoryId'});
Items.belongsTo(Refinventory, {foreignKey:'inventoryId'});


router.get('/getitems', async(req, res) => {
    try{
        const {kw, status} = req.query;
        const filterItems = await Items.findAll({
            where:{
                barcode:{[Op.like]:"%"+kw+"%"},
                status:Number(status)
            },
            include:[
                {model:Refsizes},
                {model:Reftype},
                {model:Customers},
                {model:Users},
                {model:Refinventory}
            ]
        });
        res.status(200).json(filterItems);
    }catch(e){
        res.status(500).json(e);
    }
});

router.post('/additem', async(req, res) => {
    try{
        const {itemSizeId,barcode,trypeId,cutomerId,userId,from,to,status,remarks,inventoryId } = req.body;
        const addItems = await Items.create({
            itemSizeId:itemSizeId,
            barcode:barcode,
            trypeId:trypeId,
            cutomerId:cutomerId,
            userId:userId,
            from:from,
            to:to,
            status:status,
            remarks:remarks,
            inventoryId:inventoryId,
        });
        res.status(200).json(addItems.id);
    }catch(e){
        res.status(500).json(e);
    }
});

router.delete('/deleteitem', async(req, res) => {
    try{
        const {itemid} = req.query; 
        const deleteitem = await Items.destroy({
            where:{id:itemid}
        });
        res.status(200).json(deleteitem);
    }catch(e){
        res.status(500).json(e); 
    }
});

router.post('/edititem', async(req, res) => {
    try{
        const {id,itemSizeId,barcode,trypeId,cutomerId,userId,from,to,status,remarks,inventoryId } = req.body;
        const update = await Items.update({
            itemSizeId:itemSizeId,
            barcode:barcode,
            trypeId:trypeId,
            cutomerId:cutomerId,
            userId:userId,
            from:from,
            to:to,
            status:status,
            remarks:remarks,
            inventoryId:inventoryId,
        },
        {where:{id:id}}
        );
        res.status(200).json(update);
    }catch(e){
        res.status(500).json(e);
    }
});

module.exports = router;
