const userApi = require('./userRoute');
const producctApi = require('./productRoute');
const customerApi = require('./cutomerRoute');
const invoiceApi = require('./invoiceRoute');
const router = require('express').Router();

// // url for login
// router.post('/login', loginController.login);
// router.post('/reset-password', loginController.resetPassword);

// //url for invoice
// router.get('/invoice/get-invoices',invoiceController.findAll);
// router.get('/invoice/:id', invoiceController.findOne);
// router.get('/invoices/get-invoicesnormal',invoiceController.findNormalInvoice);
// router.get('/invoices/get-invoicescancel',invoiceController.findCancelInvoice);
// router.post('/invoice/add-invoice', invoiceController.makeInvoice);
// router.put('/invoice/cancel-invoice/:id', invoiceController.cancelInvoice);


router.use(userApi);
router.use(producctApi);
router.use(customerApi);
router.use(invoiceApi);


module.exports = router