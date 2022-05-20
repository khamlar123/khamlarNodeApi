
const {  DataTypes } = require("sequelize");
const db = require("../db/database");

// convert model res
const database = db.define('Users', {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING
})

  const login = async (req, res) => {
    const {userName, password} = req.body;
    const findUser = await database.findOne({where:{firstName: userName}})
  }



module.exports = {};