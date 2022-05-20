
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


const addUser = async (req, res) => {
    const  {firstName, lastName, email, password} = req.body;
    const endCode = base64.set(password.toString());
    const key = (await endCode).toString() ;
    const user = await  database.create({firstName, lastName, email, password: key});
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

  const updateUser = async(req, res) => {
    const model = {id, firstName, lastName, email} = req.body;
    const findItem = await database.findByPk(model.id);     
    if(findItem){
     const updateRes = await database.update(model, {where: {id:model.id}});
     res.status(200).json(updateRes);
    }else{
      res.status(500).send('not have user');
    }
  }


module.exports = {
  addUser,
  findAll,
  findOne,
  deleteUser,
  updateUser,
};