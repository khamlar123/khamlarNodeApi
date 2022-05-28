
const { sequelize, DataTypes } = require('../db/database');
const Uids = require('../models/uid')(sequelize, DataTypes);
const router = require('express').Router();


router.get('/uid/get-uidbyproductid/:id', async(req, res) => {
    try{
        let {id} = req.params;
        const uids = await Uids.findAll({where:{id: id}});
        (uids) ? res.status(200).json(uid) : res.status(500).json([]);
    }catch (err){
        res.status(200).json(err)
    }
});

router.post('/uid/add-uid', async(req, res) => {
    try{
        const addUid = await Uids.create(req.body)
        (addUid)? res.status(200).json(addUid): res.status(500).json([])
    }catch(err){
        res.status(200).json(err)
    }
});

router.put('/uid/edit-uid', async(req, res) => {
    try{
        const {id, uidType, value, productId} = req.body;
        const updateUid = await Uids.update({uidType:uidType, value:value, productId: productId, updatedAt: new Date()}, {where:{id: id}});
        (updateUid)? res.status(200).json('add uid done !') : res.status(500).json('add uid err !'); 
    }catch (err){
        res.status(500).json(err);
    }
});

router.delete('/uid/delete-uidbyproductid:id', async(req, res) => {
    try{
        const deleteUid = await Uids.destroy({productId: req.params.id});
        (deleteUid)? res.status(200).json('delete uid done !'): res.status(500).json('delete uid error !')

    }catch (err){
        res.status(500).json(err);
    }
});


module.exports = router;