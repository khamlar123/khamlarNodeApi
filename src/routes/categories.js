
const { sequelize, DataTypes } = require("../db/database");
const Categories = require("../models/category")(sequelize, DataTypes);
const router = require("express").Router();

router.get('/categories/get-cate/:offset/:limit',async (req, res) => {
    try{    
        const filterItems = await Categories.findAndCountAll({
            where:{},
            offset: Number(req.params.offset),
            limit: Number(req.params.limit)
        })

        (filterItems)? res.status(200).json(filterItems): res.status(500).json([])
    }catch (err){
        res.status(500).json(err);
    }
});

router.get('/categories/get-byid/:id', async(req, res) => {
    try{
        const findItem = await Categories.findOne({where:{id: req.params.id}});
        (findItem)? res.status(200).json(findItem): res.status(500).json([])
        
    }catch (err){
        res.status(500).json(err);
    }
});

router.put('/categories/edit-cate', async (req, res) => {
    try{

        const update = await Categories.update(req.body, {where:{id: req.body.id}});
        (update)? res.status(200).json('update done !'): res.status(500).json([]);

    }catch (err){
        res.status(500).json(err);
    }
});

router.post('/categories/add-cate', async (req, res) => {
    try{
        const update = await Categories.create(req.body);
        (update)? res.status(200).json('update done !'): res.status(200).json('update err !');
    }catch (err){
        res.status(500).json(err);
    }
});

router.delete('/categories/:id', async (req, res) => {
    try{
        await Categories.destroy({where:{id: req.params.id}});
        res.status(200).json('delete categories done !');
    }catch (err){
        res.status(500).json(err);
    }
});

module.exports = router;