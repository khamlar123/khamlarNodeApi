
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

     
    if((await base64.get(findUser.dataValues.password)).toString() === password.toString()){
      console.log('login !!!!!!!!!!!!!!!!');
    }

   console.log();
    

    res.status(200).json(findUser);

  }



module.exports = {
  login
};