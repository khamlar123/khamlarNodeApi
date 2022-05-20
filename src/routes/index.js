
const router = require('express').Router();
// add router
const userController = require('./userRoute');
const productController = require('./productRoute');
const customerController = require('./cutomerRoute');


// url for user
router.get('/user/get-user', userController.findAll);
router.get('/user/:id', userController.findOne);
router.put('/user/edit-user', userController.updateUser);
router.post('/user/add-user', userController.addUser);
router.delete('/user/:id', userController.deleteUser);
// url for product
router.get('/product/get-product', productController.findAll);
router.get('/product/get-product-active', productController.findOnlyActive);
router.get('/product/:id', productController.findOne);
router.put('/product/edit-product', productController.updateProduct);
router.post('/product/add-product', productController.addProduct);
router.delete('/product/:id', productController.deleteProduct);
// url for customer
router.get('/customer/get-customer', customerController.findAll);
router.get('/customer/:id', customerController.findOne);
router.put('/customer/edit-customer', customerController.updateCustomer);
router.post('/customer/add-customer', customerController.addCustomer);
router.delete('/customer/:id', customerController.deleteCustomer);



module.exports = router