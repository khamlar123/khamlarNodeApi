'use strict';
const Users = require('../models/user')(sequelize, DataTypes);
const { sequelize, DataTypes } = require("../db/database");
const router = require('express').Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const multer = require("multer");
const fileStorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/images");
  },

  filename: function (req, file, cb) {
    // const uniqueSuffix =  Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });

router.get('/getuser', async(req, res) => {
try{
    const getUser = await Users.findAll();
    res.status(200).json(getUser);
}catch(e){
    res.status(500).json(e);
}
});

router.get('/getuser/byid', async(req, res) => {
try{
    const userId = req.query;
    const findUser = await Users.findOne({where:{id:Number(userId)}});
    res.status(200).json(findUser);
}catch(e){
    res.status(500).json(e)
}
});

router.post('/adduser',upload.single("profile"), async(req, res) => {
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

router.delete('/deleteuser', async(req, res) => {
    try{
        const {id} = req.params;
        const deleteUser = await Users.destroy({where:{id:id}});
        res.status(200).json(deleteUser);
    }catch(e){
        res.status(500).json(e);
    }
});

router.put('/edituser',upload.single("profile"), async(req, res) => {
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

module.exports = router;
