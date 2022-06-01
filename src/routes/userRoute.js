
const { sequelize, DataTypes } = require('../db/database');
const User = require('../models/user')(sequelize, DataTypes);
const route = require('express').Router();
const base64 = require('../security/endCode');
const message = require ('../security/telegram.js');

route.get('/users/get-user/:count/:skip', async(req, res) => {
    try{
      const {count, skip} = req.params;
        const users = await  User.findAndCountAll({
          where:{},
          offset: Number(skip),
          limit: Number(count),
        });
      res.status(200).json(users);
    
    }catch (err){
        res.status(200).json(err);
    }
});

route.post('/user/add-user', async(req, res) => {
    try{
        const  {firstName, lastName, email, password,telegramToken, chat_id} = req.body;
        const endCode = base64.set(password.toString());
        const key = endCode.toString() ;
        await  User.create({firstName, lastName, email, password: key, telegramToken, chat_id});

        postModal  ={
          token: '5002187453:AAHbW4_2lqwc849IH8r-xJlV-iykC74RDME',
          chat_id : '-1001520203517',
          text : 'has add new user, user name is: ' + firstName 
        }

        res.status(200).json('add user done !');
        message.sent(postModal);
    }catch (err){
        res.status(500).json(err)
    }
});

route.get('/user/:id', async(req, res) => {
    try{
      let {id} = req.params;
      const user = await User.findByPk(id);
      res.status(200).json(user);
    }catch (err){
      res.status(500).json(err)
    }
});

route.delete('/user/:id', async(req, res) => {
    try{
      let {id} = req.params;
      await User.destroy({where: {id:id}});
      // const deleteList =  await database.destroy({where: {id:[1,2,3,4]}});
      res.status(200).json('is deleted !');
    }catch (err){
      res.status(500).json(err);
    }
});

route.put('/user/edit-user', async(req, res) => {
    try{
        const model = {id, firstName, lastName, email, password, telegramToken, chat_id} = req.body;
        const findItem = await User.findByPk(model.id);     
          if(findItem){
              const endCode = base64.set(password.toString());
              const key =  endCode.toString();
              model.password = key;
              const updateRes = await User.update(model, {where: {id:model.id}});
              res.status(200).json(updateRes);
          }else{
              res.status(500).json('error');
          }
    }catch (err){
      res.status(500).json(err);
    }
});

route.post('/user/change-password', async(req, res) => {
      try{
          const {email, password, newPassword} = req.body;
          const findUser = await User.findOne({where:{email:email}})
          if(findUser){
            let decode = (base64.get(findUser.dataValues.password)).toString();
            if(decode === password){
              const endCode = base64.set(newPassword.toString());
              const key =  endCode.toString();
              const updatePassword = await User.update({password:key},{where: {email:email}});
              res.status(200).json(updatePassword);
            }else{
              res.status(500).json('password not match');
            }
          }else{
            res.status(500).json('not have email !');
          }
      }catch{
          res.status(500).json(err);
      }
});

module.exports = route;