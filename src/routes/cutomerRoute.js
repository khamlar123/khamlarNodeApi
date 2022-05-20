
const {  DataTypes } = require("sequelize");
const db = require("../db/database");

// convert model res
const Cutomer = db.define('Customer', {
    fristName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNo: DataTypes.STRING
});

const findAll = async (req, res) => {
    const getAllCutomer = await Cutomer.findAll();
    res.status(200).json(getAllCutomer);
}

const findOne = async (req, res) => {
    let {id} = req.params;
    const getOneCutomer = await Cutomer.findByPk(id);
    res.status(200).json(getOneCutomer);
}

const addCustomer = async (req, res) => {
    const {fristName, lastName, email, phoneNo} = req.body;
     await Cutomer.create({fristName, lastName, email, phoneNo});
    res.status(200).send('add customer done !');
}

const deleteCustomer = async (req, res) => {
    const {id} = req.params;
    await Cutomer.destroy({where:{id:id}});
    res.status(200).send('delete done !');
}

const updateCustomer = async (req, res) => {
    const updateModal = {id, fristName, lastName, email, phoneNo} = req.req;
    await Cutomer.update(updateModal, {where:{id:updateModal.id}});
    res.status(200).send('update done !');
}

module.exports ={
    findAll,
    findOne,
    addCustomer,
    deleteCustomer,
    updateCustomer,
}