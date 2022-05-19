
const {  DataTypes } = require("sequelize");
const db = require("../db/database");
const router = require('express').Router();

const database = db.define('Users', {
      firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
})



router.post('/', async (req, res) => {
    var model = req.body;
    const usuarios = await  database.create(model);
    console.log(model)

      res.status(200).json(usuarios);
  });

router.get('/', async (req, res) => {
  const usuarios = await  database.findAll();
    res.json(usuarios);
});


module.exports = router;