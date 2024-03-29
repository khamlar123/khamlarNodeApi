'use strict';
const { sequelize, DataTypes } = require("../db/database");
const Customers = require('../models/customers')(sequelize, DataTypes);
const CustomersAddress = require('../models/customeraddress')(sequelize, DataTypes);
Customers.hasMany(CustomersAddress, {foreignKey: "customerId"});
CustomersAddress.belongsTo(Customers, {foreignKey: "customerId"});


const router = require('express').Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get('/get-customer', async(req, res) => {
    try{
        const filterItems = await Customers.findAll({
            include:[{model:CustomersAddress}]
        });
        res.status(200).json(filterItems);
    }catch(e){
        res.status(500).json(e);
    }
});

router.get('/get-customer', async(req, res) => {
    try{
        const {cid} = req.query;
        const filterItem = await Customers.findOne({
            where:{id:cid},
            include:[{model:CustomersAddress}]
        });
        res.status(200).json(filterItem);
    }catch(e){
        res.status(500).json(e);
    }
});

router.post('/add-customer', async(req, res) => {
    try{
        const {name, lastName, phone, addressIds} = req.body;
        const additem = await Customers.create({
            name: name, 
            lastName: lastName,
            phone: phone
        });
        addressIds.forEach(itx => {
            CustomersAddress.create({customerId:additem.id,addressId:itx});
        });
        res.status(200).json(additem.id);
    }catch(e){
        res.status(500).json(e);
    }
});

router.put('/edit-customer', async(req, res) => {
    const {id, name, lastName, phone, addressIds} = req.body;
    let x = [];
    const findCustomer = await Customers.findOne({where:{id:id}});
    if(findCustomer){
        const updateItem = await Customers.update({
            name: name, 
            lastName: lastName,
            phone: phone
        }, {where:{id:id}});
        x.push(updateItem);
    }
   await CustomersAddress.destroy({where:{customerId:id}});
   addressIds.forEach(async itx => {
        const addNew = await CustomersAddress.create({customerId:id,addressId:itx});
        x.push(addNew);
   });
   res.status(200).json(x);

});

router.delete('/delete-customer', async(req, res) => {
    try{
        const {cid} = req.query;
        await CustomersAddress.destroy({where:{customerId:cid}});
        const deleteItem = await Customers.destroy({where:{id:cid}});
        res.status(200).json(deleteItem);
    }catch(e){
        res.status(500).json(e);
    }
});



module.exports = router;
