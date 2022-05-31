
const router = require('express').Router();
const { sequelize, DataTypes } = require('../db/database');
const User = require('../models/user')(sequelize, DataTypes);
const base64 = require('../security/endCode');
const axios = require('axios');
const message = require('../security/telegram');


  router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        const findUser = await User.findOne({where:{email: email}})
        let decode = (base64.get(findUser.dataValues.password)).toString();
        if( decode === password.toString()){ 
          
          postModal  ={
            token: findUser.dataValues.telegramToken,
            chat_id : findUser.dataValues.chat_id,
            text  : findUser.dataValues.firstName + 'has login' + ' ' + new Date().toISOString()
          }

          message.sent(postModal);
        
             res.status(200).json('login !!!!!!!!!!!!!!!!');
          }else{
             res.status(500).json('login error')
          }
    }catch (err){
      res.status(500).json(err);
    }
  });

  

  router.post('/resetPassword', async(req, res) => {
      try{
        const {email} = req.body;
        const findUser = await User.findOne({where: {email:email}})    
        if(findUser){
          let password = makeid(8);
          const endCode = base64.set(password.toString());
          const key = endCode.toString() ;
          const reset = await User.update({password: key},{where: {email:email}})
         if(reset){
        
          postModal  ={
            token: '5002187453:AAHbW4_2lqwc849IH8r-xJlV-iykC74RDME',
            chat_id : '-1001520203517',
            text  : findUser.dataValues.firstName + ' ' + 'has change Password is' + ' ' + password
          }

          message.sent(postModal);


           res.status(200).json(`reset password done your new password`);
          }else{
            res.status(500).json('email invalid !')
          }
        }
      
      }catch (err){
        res.status(500).json(err)
      }
  });

  router.post('/changepassword', async (req, res) => {
      try{
        const {email, firstName, lastName ,password} = req.body;
        const findUser = await User.findOne({where: {email:email}});    
        if(findUser.firstName === firstName && findUser.lastName === lastName){
            const endCode = base64.set(password.toString());
            const key = endCode.toString() ;
            const change = await User.update({password: key},{where:{email: email}})
            res.status(200).json('change password done !');
      
        }
      }catch (err){
        res.status(500).json(err);
      }
  })

  router.post('/forgot-password', async(req, res) => {
    try{
      const {email,lastName, firstName} = req.body;
      const findUser = await User.findOne({where: {email:email}}); 

      if(findUser.firstName == firstName && findUser.lastName === lastName){
        let password = makeid(8);
        const endCode = base64.set(password.toString());
        const key = endCode.toString() ;
        const reset = await User.update({password: key},{where: {email:email}});
       if(reset){

        postModal  ={
          token: findUser.dataValues.telegramToken,
          chat_id : findUser.dataValues.chat_id,
          text  : findUser.dataValues.firstName + ' ' + 'forgot password new Password is:' + ' ' + password
        }

        message.sent(postModal);


        res.status(200).json(`reset password done !`)
        }else{
          res.status(500).json('email invalid !')
        }
      }else{
        res.status(500).json('email, lastName, firstName invalid !')
      }
    }catch (err){
      res.status(500).json(err)
    }
  });

  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *  charactersLength));
    }
    return result;
  }


module.exports =  router;