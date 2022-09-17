'use strict';

const { sequelize, DataTypes } = require("../db/database");
const Users = require('../models/user')(sequelize, DataTypes);
const Sh = require('./shared');
const router = require('express').Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;


router.get('/get-user', async(req, res) => {
try{
    const getUser = await Users.findAll();
    res.status(200).json(getUser);
}catch(e){
    res.status(500).json(e);
}
});

router.get('/get-user/byid', async(req, res) => {
try{
    const userId = req.query;
    const findUser = await Users.findOne({where:{id:Number(userId)}});
    res.status(200).json(findUser);
}catch(e){
    res.status(500).json(e)
}
});

router.post('/add-user',Sh.uploadImgFunc().single("profile"), async(req, res) => {
try{
    const {firstName,lastName,userName,password,profile} = req.body;
    const addUser = await Users.create({
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        password: password,
        profile: req.file.filename,
    });
    res.status(200).json(addUser.id);
}catch(e){
    res.status(500).json(e);
}
});

router.delete('/delete-user', async(req, res) => {
    try{
        const {id} = req.params;
        const deleteUser = await Users.destroy({where:{id:id}});
        res.status(200).json(deleteUser);
    }catch(e){
        res.status(500).json(e);
    }
});

router.put('/edit-user',Sh.uploadImgFunc().single("profile"), async(req, res) => {
    try{
        const {id,firstName,lastName,userName,password,profile} = req.body;
        const addUser = await Users.update({
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            password: password,
            profile: req.file.filename,
        },
        {where:{id:Number(id)}}
        );
        res.status(200).json(addUser.id);
    }catch(e){
        res.status(500).json(e);
    }
});

router.post('/login', async(req, res) => { 
    try{    
        const {userName, password} = req.body;
        const user = await User.findOne({
            where:{
                [Op.and]:[
                    {username:userName},
                    {password:password},
                ]
            }
        });

        res.status(200).json(user);

    }catch(e){
        res.status(500).json(e);
    }
});

module.exports = router;
