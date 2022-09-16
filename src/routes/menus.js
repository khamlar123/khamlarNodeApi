'use strict';
const { sequelize, DataTypes } = require("../db/database");
const Menues = require('../models/menus')(sequelize, DataTypes);

const router = require('express').Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get('/get-menus', async (req, res) => {
    try{
        const menus = await Menues.findAll();
        res.status(200).json(menus);
    }catch(e){
        res.status(500).json(e);
    }
});

router.post('/add-menu', async (req, res) => {
    try{
        const {menuName,status,orderIndex,icon,parentId} = req.body;
        const checMenu = await Menues.findOne({where: {menuName: menuName}});
        if(checMenu){
            const adModel = {
                menuName: menuName,
                status: status,
                orderIndex: orderIndex,
                icon: icon,
                parentId: parentId,
            }
          const update = await Menues.create(adModel);
          res.status(200).json(update.id);
        }
        res.status(404).json("Menue has exists");
    }catch(e){ 
        res.status(500).json(e); 
    }
});

router.put('/edit-menue', async (req, res) => {
    try{
        const {id,menuName,status,orderIndex,icon,parentId} = req.body;
        const findItem = await Menues.findOne({where: {id:id}});
        (!findItem)? res.status(404).json("No have this menu selector"): null;

        findItem.menuName = menuName;
        findItem.status = status;
        findItem.orderIndex = orderIndex;
        findItem.icon = icon;
        findItem.parentId = parentId;

        const update = await Menues.update(findItem.dataValue,{where: {id: findItem.id}});
        res.status(200).json(update.id);

    }catch(e){  
        res.status(500).json(e);
    }
});

router.delete('/delete-menu', async (req, res) => {
    try{
        const findItem = await Menues.findOne({where: {id: req.params.id}});
        (!findItem)? res.status(404).json(`No have this menu`): null;
        const deleteM = await Menues.destroys({where: {id: findItem.id}});
        res.status(200).json(deleteM);
    
    }catch(e){
        res.status(500).json(e);
    }
});



module.exports = router;
