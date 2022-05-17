const Usuarios = require('../models/Usuario');

const router = require('express').Router();


router.get('/', async (req, res) => {
  const usuarios = await  Usuarios.findAll();
    res.json(usuarios);
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const usuarios = await Usuarios.findByPk(id);
    res.json(usuarios);
});


router.post('/', async (req, res) => {

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
    res.json(usuarios);
});

module.exports = router;