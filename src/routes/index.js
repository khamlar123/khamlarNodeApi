
const router = require('express').Router();
// add router
const loginController = require('./loginRoute');
const userController = require('./userRoute');
const productController = require('./productRoute');
const customerController = require('./cutomerRoute');
const invoiceController = require('./invoiceRoute');

// url for login
router.post('/login', loginController.login);
router.post('/reset-password', loginController.resetPassword);
// url for user
router.get('/user/get-user', userController.findAll);
router.get('/user/:id', userController.findOne);
router.put('/user/edit-user', userController.updateUser);
router.post('/user/add-user', userController.addUser);
router.delete('/user/:id', userController.deleteUser);
router.put('/user/change-password', userController.changePassword);
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
//url for invoice
router.get('/invoice/get-invoices',invoiceController.findAll);
// router.get('/invoice/:id', invoiceController.findOne);
router.post('/invoice/add-invoice', invoiceController.makeInvoice);


module.exports = router