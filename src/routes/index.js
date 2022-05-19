const usuariosController = require('./usuarios');
const userController = require('./user');
const router = require('express').Router();


router.get('/usuarios/get-usuarlist', usuariosController.findAll);
router.post('/usuarios/add-usuar', usuariosController.addUsuarios);
router.delete('/usuarios/:id', usuariosController.deleteUsura);
router.get('/usuarios/:id', usuariosController.findOne);

router.get('/user/get-user', userController.findAll);
router.post('/user/add-user', userController.addUser);
router.delete('/user/:id', userController.deleteUser);
router.get('/user/:id', userController.findOne);


module.exports = router