 const { DataTypes } = require('sequelize');
 const db = require("../db/database");


const Usuarios = db.define('Usuarios', {
    nombre: {
        type: DataTypes.STRING,
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
    },

    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
})

module.exports = Usuarios;
