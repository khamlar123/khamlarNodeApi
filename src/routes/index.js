
const userController = require('./user');
const productController = require('./product');
const router = require('express').Router();

router.get('/user/get-user', userController.findAll);
router.post('/user/add-user', userController.addUser);
router.delete('/user/:id', userController.deleteUser);
router.get('/user/:id', userController.findOne);
router.put('/user/edit-user', userController.updateUser);

router.get('/product/get-product', productController.findAll);
router.get('/product/get-product-active', productController.findOnlyActive);
router.post('/product/add-product', productController.addProduct);
router.delete('/product/:id', productController.deleteProduct);
router.get('/product/:id', productController.findOne);
router.put('/product/edit-product', productController.updateProduct);



module.exports = router