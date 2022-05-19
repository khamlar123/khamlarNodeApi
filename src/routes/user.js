
const {  DataTypes } = require("sequelize");
const db = require("../db/database");
// const router = require('express').Router();
const database = db.define('Users', {
      firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
})


const addUser = async(req, res) => {
  var model = req.body;
  const user = await  database.create(model);
    res.status(200).json(user);
}

  const findAll = async (req, res) => {
    const users = await  database.findAll();
    res.status(200).json(users);
  }

  const findOne = async (req, res) => {
      let {id} = req.params;
      const user = await database.findByPk(id);
      res.status(200).json(user);
  }

  const deleteUser = async(req, res) => {
      let {id} = req.params;
      await database.destroy({where: {id:id}});
      // const deleteList =  await database.destroy({where: {id:[1,2,3,4]}});
      res.status(200).json('is deleted !');
  }



module.exports = {
  addUser,
  findAll,
  findOne,
  deleteUser,
};