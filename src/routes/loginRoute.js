
const {  DataTypes } = require("sequelize");
const db = require("../db/database");
const base64 = require('../security/endCode');

// convert model res
const database = db.define('Users', {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
})

  const login = async (req, res) => {
    const {email, password} = req.body;
    const findUser = await database.findOne({where:{email: email}})
    let decode = (await base64.get(findUser.dataValues.password)).toString();

    if( decode === password.toString()){
      res.status(200).send('login !!!!!!!!!!!!!!!!');
    }else{
      res.status(500).send('login error');
    } 
  }

  const resetPassword = async (req, res) => {
    const {email} = req.body;
    const findUser = await database.findOne({where: {email:email}})
    if(findUser){
      res.status(200).send('reset password done!')
    }else{
      res.status(500).send('email invalid !')
    }
  }  

module.exports = {
  login,
  resetPassword
};