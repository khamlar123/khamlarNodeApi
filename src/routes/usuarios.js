const req = require('express/lib/request');
const Usuarios = require('../models/Usuario');

    const findAll = async (req, res) =>{
        const getAllUser = await Usuarios.findAll();
        res.status(200).json(getAllUser)
    }  

    const findOne = async (req, res) => {
        const {id} = req.params;
        const usuarios = await Usuarios.findByPk(id);
        res.status(200).json(usuarios);
    }

    const addUsuarios = async (req, res) => {
        const { nombre, email } = req.body;
            if(!nombre || !email){
                return  res.status(400).json({
                    error: "uno o mas campos vacios",
                });
            }
        
            const findItem = await  Usuarios.findAll();
        
            if(findItem.find(f => f.email === email) || findItem.find(f => f.nombre === nombre)){
                return  res.status(400).json({
                    error: findItem.find(f => f.nombre === nombre)? 'nombre has ready!': (findItem.find(f => f.email === email))? 'email has ready!' : 'err',
                });
            }
        
            const usuarios = await Usuarios.create({nombre, email});
            res.status(200).json(usuarios);
    }

    const deleteUsura = async(req, res) => {
            const {id} = req.params;

             await Usuarios.destroy({where: {id:id}})
            res.status(200).send('delete Usura!')
    }

    module.exports = {
        findAll,
        findOne,
        addUsuarios,
        deleteUsura,
    };